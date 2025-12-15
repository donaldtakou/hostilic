// Base de données en mémoire - pas besoin de MongoDB
// Les modèles sont gérés dans lib/db.ts

async function dbConnect() {
  // Pas de connexion nécessaire avec la base en mémoire
  return true
}

export default dbConnect
export { dbConnect as connectDB }
