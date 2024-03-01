import { getServerSession } from "next-auth"
import styles from "./styles.module.scss"
import { authOptions } from "@/utils/auth"
import initializeFirebaseClient from "@/utils/firebaseConnection"
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import { UserComponent } from "@/components/User"
import { redirect } from "next/navigation"
import api from "@/utils/api"

export default async function User(){
  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/login')
  }

  let wallet = ''
  let alchemyWallet = ''
  let indexUsers = 0
  const { db } = initializeFirebaseClient()
  const userBase = doc(db, "users", `${session?.user.email}`)
  const data = await getDoc(userBase)

  if(data.exists()){
    wallet = data.data()?.wallet
    alchemyWallet = data.data()?.alchemyWallet
    const usersRef = collection(db, "users")
    const queryIndex = query(usersRef)
    const index = (await getDocs(queryIndex)).size
    indexUsers = index
  }

  async function handleSubmit(){
    "use server"
    try{
      const response = await api.post("/api/createAlchemy",{
        data: {
          wallet: wallet,
          email: session?.user.email,
          index: indexUsers
        }
      })
    }catch(error){
      console.log(error)
    }
    redirect("/")
  }
  
  return (
    <main className={styles.main}>
      <UserComponent
        wallet={wallet}
        alchemyWalllet={alchemyWallet}
        email={session.user.email as string}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}