import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header/Header';

export function Profile() {
  return (
    <div>
      <Header title="Profile" />
      <footer>{ Footer() }</footer>
    </div>
  );
}
