import React from 'react';
import './index.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import DonationComponent from './components/DonationComponent';


class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Hero />
        <DonationComponent/>
        <Footer />
      </div>
    );
  }
}

export default App;