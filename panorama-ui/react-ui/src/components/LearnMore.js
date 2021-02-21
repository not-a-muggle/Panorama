import React from 'react';

function LearnMore() {
    return(
 <div className="LearnMore">
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>


<header className="masthead text-center text-white">
<div className="masthead-content">
 <div className="container">
   <h1 className="masthead-subheading mb-0">Panorama</h1>
   <h1 className= " mb-0" >Preserving Memories for Life</h1>
   <h3 className="mb-0">Panorama is a Cloud-based Photo Sharing Application.</h3> 
   <h3 className="mb-0">Upload, Download, Share and Organize your photos.</h3> 
   <h3 className="mb-0">Pick your Camera, Record your Daily Drama, and Panorama will Take Care of the Rest!</h3>
 </div>
</div>
<div className="bg-circle-1 bg-circle"></div>
<div className="bg-circle-2 bg-circle"></div>
<div className="bg-circle-3 bg-circle"></div>
</header>

<section>
<div className="container">
 <div className="row align-items-center">
   <div className="col-lg-6 order-lg-2">
     <div className="p-5">
       <img className="img-fluid rounded-circle" src="img/pinkcloudupload.jpg" alt=""/>
     </div>
   </div>
   <div className="col-lg-6 order-lg-1">
     <div className="p-5">
       <h3 className="display-4">Upload Your Photos to Cloud.</h3>
       <p>Upload your precious memories on cloud in a click. Panorama provides features for single photo upload and bulk photos upload.</p>
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
       <img className="img-fluid rounded-circle" src="img/download.jpg" alt=""/>
     </div>
   </div>
   <div className="col-lg-6">
     <div className="p-5">
       <h3 className="display-4">Download your photos from Cloud.</h3>
       <p>Download photos from cloud in a click. You can download the photos on your device and google drives. Panorama offers secure download via encrypted channels.  </p>
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
       <img className="img-fluid rounded-circle" src="img/share.jpg" alt=""/>
     </div>
   </div>
   <div className="col-lg-6 order-lg-1">
     <div className="p-5">
       <h3 className="display-4">Share your Photos with Friends and Family</h3>
       <p>Panorama is a secure photo sharing application. Share your moments with your loved phones. Panorama gives an option to grant access via email ids.</p>
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

export default LearnMore