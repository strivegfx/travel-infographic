/*jshint devel: true*/
/*global TweenMax: true*/
/*global Chart: true*/


$(document).ready(function(){

	var $m = {

		s : {}, // settings object...

		genSet : function(){ // generate settings...

			$m.s.ani = 0.25; // the base animation speed for tweens

			//$m.s.col = {
			//	teal : #08AFB7,
			//	tealDrk : 
			//}

			$m.s.sld = $('.slider'); // slider container

			$m.s.sldOpt = $m.s.sld.siblings('.slider-options'); // slider options container
			$m.s.sldOptLi = $m.s.sldOpt.find('li'); // all slider options
			$m.s.sldOpt100 = $m.s.sldOpt.find('li[data-val="100"]'); // slider option 100
			$m.s.sldOpt200 = $m.s.sldOpt.find('li[data-val="200"]'); // slider option 200
			$m.s.sldOpt300 = $m.s.sldOpt.find('li[data-val="300"]'); // slider option 300

		}, // end of genSet

		init : function(){

			$m.genSet(); // generate settings
			$m.genSld(); // generate slider
			$m.uiLst(); // UI listeners
			$m.genPie(); // generate pie charts

		}, // end of init fnc

		genSld : function(){ // generate slider...

			var $sld = $m.s.sld; // get slider reference from settings...

			// create slider...
			$sld.slider({
				range: 'min',
				value: 200,
				min: 100,
				max: 300,
				//animate: '500'
			});

			// create slider dom references after slider has been created...
			$m.s.sldBar = $sld.find('.ui-slider-range'); // slider bar

		}, // end of genSld fnc

		uiLst : function(){ // create UI listeners

			var $sld = $m.s.sld; // get slider reference from settings...

			$sld
				.on('slidestart', function(){

					$m.uiAct.sld.slidestart(); // run the UI action...					

				})
				.on('slide', function(){

					var $curPos = $sld.slider('value'); // CURRENT handle position

					$m.uiAct.sld.slide($curPos); // run the UI action...					

				})
				.on('slidestop', function(){

					var $curPos = $sld.slider('value'); // CURRENT handle position

					$m.uiAct.sld.slidestop($curPos); // run the UI action...					

				})
				.on('mouseenter', function(){

					

				})
				.on('mouseleave', function(){

					

				});

			var $sldOpt = $m.s.sldOpt; // get slider-options reference from settings...

			$sldOpt
				.on('click', 'li', function(){

					var $curPos = $sld.slider('value'); // CURRENT handle position

					$m.uiAct.sldOpt.onclick($(this), $curPos);

				})
				.on('mouseenter', 'li', function(){

					$m.uiAct.sldOpt.mouseenter($(this));

				})
				.on('mouseleave', 'li', function(){

					$m.uiAct.sldOpt.mouseleave($(this));

				});

		}, // end of uiLst fnc

		uiAct : {

			sld : {

				slidestart : function(){

					var $sldBar = $m.s.sldBar; // get slider bar reference from settings...

					$sldBar.addClass('active');
					// NOTE... the slider handle does not need it's own active class created as jQUERY UI adds one automaticlly = '.ui-state-active'

				}, // end of slide start

				slide : function($curPos){

					var $val = $m.uiAct.sld.findVal($curPos), // find which of the three options that slider handle is closer to...
						$sldOpt = $m.s.sldOpt, // slider options container
						$sldOptLi = $m.s.sldOptLi, // all slider options
						$opt = $m.s['sldOpt' + $val]; // current slider option

					$sldOptLi.removeClass('active');
					$sldOpt.addClass('slide');
					$opt.addClass('active');

				}, // end of slide fnc

				slidestop : function($curPos){

					console.log('slidestop');
					console.log('$curPos = ' + $curPos);

					var	$sld = $m.s.sld, // get slider reference from settings...
						$sldOpt = $m.s.sldOpt, // slider options container
						$sldBar = $m.s.sldBar, // get slider bar reference from settings...
						$sldPos = {
							newPos : $curPos // NEW handle position
						},
						$val = $m.uiAct.sld.findVal($curPos); // find which of the three options that slider handle is closer to...
					
					$sldBar.removeClass('active');
					$sldOpt.removeClass('slide');

					$m.uiAct.sld.sldAni($sld, $sldPos, $val);

				}, // end of slidestop fnc

				findVal : function($curPos){

					// find which of the three options that slider handle is closer to...
					if($curPos <= 150){

						//console.log('-- reset at position 1 --');

						return 100;


					}else if($curPos > 150 && $curPos < 250){

						//console.log('-- reset at position 2 --');
						
						return 200;

					}else{

						//console.log('-- reset at position 3 --');
						
						return 300;

					} // end of if statement

				}, // end of findVal fnc

				sldAni : function($sld, $sldPos, $val){

					TweenMax.to($sldPos, 0.5, {newPos : $val, onUpdate: logDat}); // animate the slider into new position...

					function logDat(){ // fun via TweenMax function above...

						$sld.slider('value', $sldPos.newPos); // update the jQuery UI slider value in the DOM with the current tweened value

					} // end dof logDat fnc

				}, // end of sldAni fuc

				mouseenter : function(){

					console.log('mouseenter');

				}, // end of mouseenter fnc

				mouseleave : function(){

					console.log('mouseleave');

				} // end of mouseleave fnc

			}, // end of sld obj

			sldOpt : {

				onclick : function($this, $curPos){

					var $sld = $m.s.sld, // get slider reference from settings...
						$sldOpt = $m.s.sldOpt, // get slider-options reference from settings...
						$sldPos = {
							newPos : $curPos // NEW handle position
						},
						$val = $this.attr('data-val'); // find the new val pos

					$m.uiAct.sld.sldAni($sld, $sldPos, $val);

					$sldOpt.find('li').removeClass('active');
					$this.addClass('active');

				}, // end of mouseenter fnc

				mouseenter : function($this){

					$this.addClass('enter');

				}, // end of mouseenter fnc

				mouseleave : function($this){

					$this.removeClass('enter');

				} // end of mouseleave fnc

			} // end of sldOpt obj

		}, // end of uiAct obj

		genPie : function(){

			var $data = [
				{
					value: 30,
					color:"#F7464A"
				},
				{
					value : 50,
					color : "#E2EAE9"
				},
				{
					value : 100,
					color : "#D4CCC5"
				},
				{
					value : 40,
					color : "#949FB1"
				},
				{
					value : 120,
					color : "#4D5360"
				}

			];

			var $pie1 = $('.chart-1').find('canvas').get(0).getContext("2d");

			//new Chart($ctx).Doughnut($data,options);
			new Chart($pie1).Doughnut($data);

		} // end of genPie fnc

	}; // end of $m obj (the module container)

	(function(){

		$m.init(); // initialise module...

	})(); // end of anonymas function

}); // end of document.ready

/*
	// ------------------------------------------------------>

	var $data = {
		'left' : 200
	};

	$('h1').on('click', function(){

		TweenMax.to($data, 2, {'left' : 300, onUpdate: logData});

	});

	function logData(){
		console.log('$data.left = ' + $data.left);

		$sld.slider('value', $data.left);
	}










	// ------------------------------------------------------>

	var $sld = $('.slider'), // the slider container
		$sldHnd = $sld.find('a'); // slider handle

	$sld.slider({
		range: 'min',
		value: 200,
		min: 100,
		max: 300,
		animate: 'true',
		slide: function( event, ui ) {
			console.log('current loc = ' + ui.value);
			//$sldPos = ui.value;
		}
	}).on( "slidestop", function( event, ui ) {

		var $curPos = $sld.slider('value'), // CURRENT handle position
			$newPos = null; // NEW handle position

		if($curPos <= 150){

			console.log('-- reset at position 1 --');

			$newPos = 100;


		}else if($curPos > 150 && $curPos < 250){

			console.log('-- reset at position 2 --');
			
			$newPos = 200;

		}else{

			console.log('-- reset at position 3 --');
			
			$newPos = 300;

		}

	});
*/

/*
	function tweenMe($newPos){

		var $curPos = parseInt($sld.slider('value'), 10),
			$step = 50, // animation steps
			$inc = 1; // positive or negitive increment?

		if($curPos > $newPos){

			$inc = -1;

		}

		console.log(typeof($curPos));

		if($curPos !== $newPos){

			$sld.slider('value', $curPos + ($step * $inc));

			console.log('tweening! >>> cur pos = ' + ($curPos + ($step * $inc)));

			//tweenMe($newPos);
		
		}else{

			return ''; // break function...
		}


	}
*/

/*
	.on('mouseup', function(){
		console.log('mouseup!');

		$sldPos = $sld.slider('option', 'value');

		console.log('{ val = ' + $sldPos + '}');

		if($sldPos <= 150){

			console.log('-- reset at position 1 --');

			// have greensock tween the value!
			$sld.slider({value: 100});

		}else if($sldPos > 150 && $sldPos < 250){

			console.log('-- reset at position 2 --');
			
			// have greensock tween the value!
			$sld.slider({value: 200});

		}else{

			console.log('-- reset at position 3 --');
			
			// have greensock tween the value!
			$sld.slider({value: 300});

		}
	});
*/


/*
	$sld.slider({
		min: 1,
		max: 3,
		create: function( event, ui ) {
			// ???
		},
		slide: function( event, ui ) {
			console.log('current loc = ' + ui.value);
		}
	});
*/