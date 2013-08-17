<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Travel Infographic</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/ht5bp.css">
		<link type="texxt/css" rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
		<link type="text/css" rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

		<div class="module-container">

			<div class="module slider-module">

				<div class="content">

					<div class="title-container">
						<span class="title-choose">choose</span>
						<span class="title-your">your</span>
						<span class="title-budget">budget</span>
					</div>

					<div class="slider"></div>
					<ul class="slider-options clear-fix">
						<li data-val="100"><span>shoe string</span></li>
						<li class="active" data-val="200"><span>average</span></li>
						<li data-val="300"><span>extravagant</span></li>
					</ul>

					<div class="sub-divider"></div>

				</div> <!-- end of content -->

			</div> <!-- end of slider-module -->

			<div class="module pie-module">

				<div class="content">

					<h2>daily costs</h2>

					<ul class="key clear-fix">
						<li class="bed">bed</li>
						<li class="attractions">attractions</li>
						<li class="transport">transport</li>
						<li class="food">food</li>
					</ul>

					<div class="sub-divider"></div>

					<div class="pie-chart chart-1">
						<h3>Bangkok</h3>

						<div class="chart-container">
							<span class="price">$113.10</span>
							<canvas width="200" height="200"></canvas>
						</div>
					</div>

				</div> <!-- end of content -->

			</div> <!-- end of pie-module -->

		</div> <!-- end of module-container -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.10.1/TweenMax.min.js"></script>
        <script src="js/vendor/Chart.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>

    </body>
</html>
