import React from 'react';

function Home() {
    return(
 <div className="Home">
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>

<header className="masthead text-center text-white">
<div className="masthead-content">
 <div className="container">
   <h1 className="masthead-heading mb-0">Panorama</h1>
   <h2 className="masthead-subheading mb-0">Preserving Memories for Life</h2>
   <a href="./LearnMore" className="btn btn-primary btn-xl rounded-pill mt-5">Learn More</a>
 </div>
</div>
<div className="bg-circle-1 bg-circle"></div>
<div className="bg-circle-2 bg-circle"></div>
<div className="bg-circle-3 bg-circle"></div>
<div className="bg-circle-4 bg-circle"></div>
</header>

<section>
<div className="container">
 <div className="row align-items-center">
   <div className="col-lg-6 order-lg-2">
     <div className="p-5">
       <img className="img-fluid rounded-circle" src="img/1.jpg" alt=""/>
     </div>
   </div>
   <div className="col-lg-6 order-lg-1">
     <div className="p-5">
       <h2 className="display-4">A good snapshot stops a moment from running away.</h2>
       <p>Every moment of every day is easily accessible because of the captured moments. Photography makes us nostalgic for times that have passed, they’re snapshots of moments that you can’t throw away.</p>
     </div>
   </div>
 </div>
</div>
</section>

<section>
<div className="container">
 <div className="row align-items-center">
   <div className="col-lg-6">
     <div className="p-5">
       <img className="img-fluid rounded-circle" src="img/2.jpg" alt=""/>
     </div>
   </div>
   <div className="col-lg-6">
     <div className="p-5">
       <h2 className="display-4">We are making photographs to understand what our life mean to us.</h2>
       <p>Joys, Sorrows, Achievements, Success Stories, Disappointing Failures and Rejoicing Celebrations - Photos speak them all. So it becomes all the more important to preserve the cherished memories, The Panorama will take care of it. </p>
     </div>
   </div>
 </div>
</div>
</section>

<section>
<div className="container">
 <div className="row align-items-center">
   <div className="col-lg-6 order-lg-2">
     <div className="p-5">
       <img className="img-fluid rounded-circle" src="img/3.jpg" alt=""/>
     </div>
   </div>
   <div className="col-lg-6 order-lg-1">
     <div className="p-5">
       <h2 className="display-4">A good photograph is knowing where to stand.</h2>
       <p>Over the Mountains and Hills, By the Seashore or Underwater, By the Side of Treks, From your Balcony - Capture your precious memories and we will preserve them</p>
     </div>
   </div>
 </div>
</div>
</section>
<section>
<div className="container">
 <div className="row align-items-center">
   <div className="col-lg-6">
     <div className="p-5">
       <img className="img-fluid rounded-circle" src="img/5.jpg" alt=""/>
     </div>
   </div>
   <div className="col-lg-6 order-lg-1">
     <div className="p-5">
       <h2 className="display-4">The artist sees what others could only catch a glimpse of.</h2>
       <p>Capture the intrinsic and intense moments and Illustrate your artist persona for the world by means of beautiful and heart touching photos.</p>
     </div>
   </div>
 </div>
</div>
</section>

<footer className="py-5 bg-black">
<div className="container">
 <p className="m-0 text-center text-white small">Copyright &copy; Panorama 2021</p>
</div>
</footer>

<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    </div>
    ) 
}

export default Home