"use client"
import styles from "./styles.module.scss"
import { signOut } from "next-auth/react"

interface userComponentProps {
  wallet: string,
  alchemyWalllet: string,
  email: string
  handleSubmit: () => void
}

export function UserComponent({wallet, alchemyWalllet, email, handleSubmit}: userComponentProps) {

  return (
    <main className={styles.main}>

      <h2>Hello {email}</h2>
      <p>Your Biconomy Wallet:</p>
      <span>{wallet}</span>

      <p>Your Alchemy Wallet:</p>
      {alchemyWalllet === '' ?
        <form action={handleSubmit}>
          <button id={styles.alchemy} type="submit">Create Alchemy Wallet</button>
        </form>
      :
        <span>{alchemyWalllet}</span>
      }
        
      <button id={styles.open} onClick={() => signOut()}>
        Logout
      </button>
    </main>
  )
}