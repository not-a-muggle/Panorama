import React from 'react';
import './App.css';

class App extends React.Component {
  render(){
  return (
    <div className="App">
       <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">PANORAMA</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Sign Up</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Log In</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
    <header class="masthead text-center text-white">
      <div class="masthead-content">
        <div class="container">
          <h1 class="masthead-heading mb-0">Panorama</h1>
          <h2 class="masthead-subheading mb-0">Preserving Memories for Life</h2>
          <a href="#" class="btn btn-primary btn-xl rounded-pill mt-5">Learn More</a>
        </div>
      </div>
      <div class="bg-circle-1 bg-circle"></div>
      <div class="bg-circle-2 bg-circle"></div>
      <div class="bg-circle-3 bg-circle"></div>
      <div class="bg-circle-4 bg-circle"></div>
    </header>
  
    <section>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 order-lg-2">
            <div class="p-5">
              <img class="img-fluid rounded-circle" src="img/1.jpg" alt=""/>
            </div>
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="p-5">
              <h2 class="display-4">A good snapshot stops a moment from running away.</h2>
              <p>Every moment of every day is easily accessible because of the captured moments. Photography makes us nostalgic for times that have passed, they’re snapshots of moments that you can’t throw away.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="p-5">
              <img class="img-fluid rounded-circle" src="img/2.jpg" alt=""/>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="p-5">
              <h2 class="display-4">We are making photographs to understand what our life mean to us.</h2>
              <p>Joys, Sorrows, Achievements, Success Stories, Disappointing Failures and Rejoicing Celebrations - Photos speak them all. So it becomes all the more important to preserve the cherished memories, The Panorama will take care of it. </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 order-lg-2">
            <div class="p-5">
              <img class="img-fluid rounded-circle" src="img/3.jpg" alt=""/>
            </div>
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="p-5">
              <h2 class="display-4">A good photograph is knowing where to stand.</h2>
              <p>Over the Mountains and Hills, By the Seashore or Underwater, By the Side of Treks, From your Balcony - Capture your precious memories and we will preserve them</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="p-5">
              <img class="img-fluid rounded-circle" src="img/5.jpg" alt=""/>
            </div>
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="p-5">
              <h2 class="display-4">The artist sees what others could only catch a glimpse of.</h2>
              <p>Capture the intrinsic and intense moments and Illustrate your artist persona for the world by means of beautiful and heart touching photos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <footer class="py-5 bg-black">
      <div class="container">
        <p class="m-0 text-center text-white small">Copyright &copy; Panorama 2021</p>
      </div>
    </footer>

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}
}

export default App;
