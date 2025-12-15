import axios from 'axios'
import crypto from 'crypto'

const CAMPAY_API_URL = process.env.CAMPAY_API_URL || 'https://api.campay.net/api/v1'
const CAMPAY_USERNAME = process.env.CAMPAY_APP_USERNAME
const CAMPAY_PASSWORD = process.env.CAMPAY_APP_PASSWORD

interface CamPayTokenResponse {
  token: string
  expires_at: string
}

interface CamPayPaymentRequest {
  amount: number
  currency: string
  from: string // Numéro de téléphone du payeur
  description: string
  external_reference: string
}

interface CamPayPaymentResponse {
  reference: string
  external_reference: string
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED'
  operator: 'MTN' | 'ORANGE'
  amount: number
  currency: string
  description: string
  link?: string
}

class CamPayService {
  private token: string | null = null
  private tokenExpiresAt: Date | null = null

  /**
   * Obtenir un token d'authentification CamPay
   */
  private async getToken(): Promise<string> {
    // Vérifier si le token est toujours valide
    if (this.token && this.tokenExpiresAt && new Date() < this.tokenExpiresAt) {
      return this.token
    }

    try {
      const response = await axios.post<CamPayTokenResponse>(
        `${CAMPAY_API_URL}/auth/token/`,
        {},
        {
          auth: {
            username: CAMPAY_USERNAME!,
            password: CAMPAY_PASSWORD!,
          },
        }
      )

      this.token = response.data.token
      this.tokenExpiresAt = new Date(response.data.expires_at)

      return this.token
    } catch (error: any) {
      console.error('CamPay authentication error:', error.response?.data || error.message)
      throw new Error('Échec de l\'authentification CamPay')
    }
  }

  /**
   * Initier un paiement Mobile Money
   */
  async initiatePayment(
    amount: number,
    phoneNumber: string,
    description: string,
    externalReference: string
  ): Promise<CamPayPaymentResponse> {
    try {
      const token = await this.getToken()

      // Formater le numéro de téléphone (format international)
      const formattedPhone = this.formatPhoneNumber(phoneNumber)

      const payload: CamPayPaymentRequest = {
        amount,
        currency: 'XAF', // Franc CFA
        from: formattedPhone,
        description,
        external_reference: externalReference,
      }

      const response = await axios.post<CamPayPaymentResponse>(
        `${CAMPAY_API_URL}/collect/`,
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error: any) {
      console.error('CamPay payment initiation error:', error.response?.data || error.message)
      throw new Error(
        error.response?.data?.message || 'Échec de l\'initiation du paiement Mobile Money'
      )
    }
  }

  /**
   * Vérifier le statut d'un paiement
   */
  async checkPaymentStatus(reference: string): Promise<CamPayPaymentResponse> {
    try {
      const token = await this.getToken()

      const response = await axios.get<CamPayPaymentResponse>(
        `${CAMPAY_API_URL}/transaction/${reference}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )

      return response.data
    } catch (error: any) {
      console.error('CamPay status check error:', error.response?.data || error.message)
      throw new Error('Échec de la vérification du statut du paiement')
    }
  }

  /**
   * Formater un numéro de téléphone au format international
   * Exemples: 
   * - 237699123456 (avec code pays)
   * - 699123456 (sans code pays, on ajoute 237 pour Cameroun)
   */
  private formatPhoneNumber(phone: string): string {
    // Retirer tous les espaces et caractères spéciaux
    let cleaned = phone.replace(/\D/g, '')

    // Si le numéro commence par 237, c'est déjà au bon format
    if (cleaned.startsWith('237')) {
      return cleaned
    }

    // Si le numéro commence par 6 (Cameroun), ajouter le code pays 237
    if (cleaned.startsWith('6')) {
      return `237${cleaned}`
    }

    // Sinon, retourner tel quel (au cas où c'est un autre pays)
    return cleaned
  }

  /**
   * Déterminer l'opérateur depuis le numéro de téléphone
   */
  getOperatorFromPhone(phone: string): 'MTN' | 'ORANGE' | 'UNKNOWN' {
    const cleaned = phone.replace(/\D/g, '')

    // Indicatifs MTN Cameroun: 67, 650-654, 680-683
    if (/^(237)?(67|65[0-4]|68[0-3])/.test(cleaned)) {
      return 'MTN'
    }

    // Indicatifs Orange Cameroun: 69, 655-659
    if (/^(237)?(69|65[5-9])/.test(cleaned)) {
      return 'ORANGE'
    }

    return 'UNKNOWN'
  }

  /**
   * Vérifier la signature d'un webhook CamPay
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const webhookSecret = process.env.CAMPAY_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.warn('CAMPAY_WEBHOOK_SECRET not configured')
      return false
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex')

    return signature === expectedSignature
  }
}

export const camPayService = new CamPayService()
export default camPayService
