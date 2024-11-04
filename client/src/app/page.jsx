import LandingPage from "../modules/user/LandingPage/LandingPage";
import styles from "./page.module.css";
import Navbar from "../modules/user/Navbar/Navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <LandingPage />
    </div>
  );
}
