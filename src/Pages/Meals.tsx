import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header/Header';

export function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <footer>{ Footer() }</footer>
    </div>
  );
}
