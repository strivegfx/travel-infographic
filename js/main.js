/*jshint devel: true*/
/*global TweenMax: true*/


$(document).ready(function(){

	var $m = {

		s : {}, // settings object...

		genSet : function(){ // generate settings...

			$m.s.ani = 0.25; // the base animation speed for tweens

			$m.s.col = {
				teal : '#08AFB7',
				tealDrk : '?',
				pink : '#ED1E79',
				pinkDrk : '?',
				sky : '#3FA9F5',
				skyDrk : '?',
				blue : '#243751',
				bueDrk : '?',
				gray : '#CCCCCC',
				grayDrk : '?'
			};

			$m.s.prc = {
				'100' : 100,
				'200' : 300,
				'300' : 700
			};

			$m.s.sld = {}; // slider reference shell
				$m.s.sld.mod = $('.slider-module'); // slider container
				$m.s.sld.cnt = $('.slider-container'); // slider container
				$m.s.sld.opt = $m.s.sld.cnt.siblings('.slider-options'); // slider options container
				$m.s.sld.optLi = $m.s.sld.opt.find('li'); // all slider options
				$m.s.sld.opt100 = $m.s.sld.opt.find('li[data-val="100"]'); // slider option 100
				$m.s.sld.opt200 = $m.s.sld.opt.find('li[data-val="200"]'); // slider option 200
				$m.s.sld.opt300 = $m.s.sld.opt.find('li[data-val="300"]'); // slider option 300
				$m.s.sld.prcNum = $m.s.sld.cnt.siblings('.price-container').find('.price .number'); // price number

			$m.s.shw = {};
				$m.s.shw.mod = $('.slideshow-module');

			$m.s.pie = {};
				$m.s.pie.mod = $('.pie-module');

				//pie1 : $('.pie-1').find('canvas').get(0).getContext("2d"),
				//pie2 : $('.pie-2').find('canvas').get(0).getContext("2d"),
				//pie3 : $('.pie-3').find('canvas').get(0).getContext("2d"),
				//pie4 : $('.pie-4').find('canvas').get(0).getContext("2d"),
			

		}, // end of genSet

		init : function(){

			$m.genSet(); // generate settings
			$m.testIe(); // is the browser less than IE 9.0
			$m.genSld(); // generate slider
			$m.uiLst(); // UI listeners
			$m.genPie(); // generate pie charts

		}, // end of init fnc

		testIe : function(){ // is the browser less than IE 9.0

			$m.s.ltIe9 = $('html').hasClass('lt-ie9');

		}, // end of testIe fnc

		genSld : function(){ // generate slider...

			var $sld = $m.s.sld.cnt; // get slider reference from settings...

			// create slider...
			$sld.slider({
				range: 'min',
				value: 200,
				min: 100,
				max: 300//,
				//animate: '500'
			});

			// create slider dom references after slider has been created...
			$m.s.sld.bar = $sld.find('.ui-slider-range'); // slider bar

		}, // end of genSld fnc

		uiLst : function(){ // create UI listeners

			var $sld = $m.s.sld.cnt; // get slider reference from settings...

			$sld
				.on('slidestart', function(){

					$m.uiAct.sld.ui.slidestart(); // run the UI action...					

				})
				.on('slide', function(){

					var $curPos = $sld.slider('value'); // CURRENT handle position
					$m.uiAct.sld.ui.slide($curPos/*, false*/); // run the UI action... false represents if the user activated the slide by clicking on the slider bar (in this case NO it was initiated by a drag = false)

				})
				.on('slidestop', function(){

					var $curPos = $sld.slider('value'); // CURRENT handle position
					$m.uiAct.sld.ui.slidestop($curPos); // run the UI action...					

				})
				.on('mouseenter', function(){

					

				})
				.on('mouseleave', function(){

					

				});

			var $sldOpt = $m.s.sld.opt; // get slider-options reference from settings...

			$sldOpt
				.on('click', 'li', function(){

					var $curPos = $sld.slider('value'); // CURRENT handle position
					$m.uiAct.sld.opt.onclick($(this), $curPos);

				})
				.on('mouseenter', 'li', function(){

					$m.uiAct.sld.opt.mouseenter($(this));

				})
				.on('mouseleave', 'li', function(){

					$m.uiAct.sld.opt.mouseleave($(this));

				});

			var $shwMod = $m.s.shw.mod; // get slideshow-module reference from settings...

			$shwMod
				.on('mouseenter', '.slideshow-options li', function(){

					$m.uiAct.shw.opt.mouseenter($(this));

				})
				.on('mouseenter', '.slideshow-image', function(){

					$m.uiAct.shw.img.mouseenter();

				})
				.on('mouseleave', '.slideshow-image', function(){

					$m.uiAct.shw.img.mouseleave();

				});

			var $pieMod = $m.s.pie.mod;

			$pieMod.find('.jqplot-container')
				.on('click', function(){

					$m.uiAct.pie.cht.onclick($(this));

				})
				.on('mouseenter', function(){

					$m.uiAct.pie.cht.mouseenter($(this));

				})
				.on('mouseleave', function(){

					$m.uiAct.pie.cht.mouseleave($(this));

				});

		}, // end of uiLst fnc

		uiAct : { // UI actions

			sld : { // slider...

				ui : { // jQUERY UI slider...

					slidestart : function(){

						var $sldMod = $m.s.sld.mod; // get slider module reference from settings...

						$sldMod.attr({'data-state' : 'slide'});

					}, // end of slide start

					slide : function($curPos/*, $click*/){

						var $val = $m.uiAct.sld.ui.findVal($curPos), // find which of the three options that slider handle is closer to...
							//$sldMod = $m.s.sld.mod, // get slider module reference from settings...
							$sldOptLi = $m.s.sld.optLi, // all slider options
							$opt = $m.s.sld['opt' + $val]; // current slider option

						$sldOptLi.removeClass('active');
						$opt.addClass('active');

						//if(!$click){ // if the slide function has not been activated be a click...
						//	$sldMod.attr({'data-state' : 'slide'});
						//}

						$m.uiAct.sld.ui.prcAni($curPos); // price animation

					}, // end of slide fnc

					slidestop : function($curPos){

						var	$sldMod = $m.s.sld.mod, // get slider module reference from settings...
							$val = $m.uiAct.sld.ui.findVal($curPos); // find which of the three options that slider handle is closer to...
						
						//$sldBar.removeClass('active');
						//$sldOpt.removeClass('slide');

						$sldMod.removeAttr('data-state');

						$m.uiAct.sld.ui.sldAni($curPos, $val); // slider animation
						$m.uiAct.sld.ui.slide($curPos/*, true*/); // slider animation

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

					sldAni : function($curPos, $val){

						var	$sld = $m.s.sld.cnt, // get slider reference from settings...
							$tmxDat = { // TweenMax data
								newPos : $curPos // NEW handle position
							};

						TweenMax.to($tmxDat, 0.5, {newPos : $val, onUpdate: logDat}); // animate the slider into new position...

						function logDat(){ // fun via TweenMax function above...

							$sld.slider('value', $tmxDat.newPos); // update the jQuery UI slider value in the DOM with the current tweened value
							$m.uiAct.sld.ui.prcAni($tmxDat.newPos); // price animation

						} // end dof logDat fnc

					}, // end of sldAni fuc

					prcAni : function($curPos){

						var $prcNum = $m.s.sld.prcNum, // get price number reference from settings...
							$optPrc = $m.s.prc, // get option price reference from settings...
							//$seg = null; // find out id the slider handle lies within the top or bottom segement of the slider... between 100 & 200 or 201 & 300
							$newPrc = null;

						if($curPos <= 200){

							$newPrc = (($curPos - 100) / 100 * $optPrc['200']);// + $m.s.prc['100'];

						}else{

							$newPrc = (($curPos - 200) / 100 * ($optPrc['300'] - $optPrc['200'])) + $optPrc['200'];

						} // end of if else statement

						$newPrc = Math.round($newPrc); // round the new price

						$prcNum.text($newPrc);

					}, // end of prcAni

					mouseenter : function(){

						console.log('mouseenter');

					}, // end of mouseenter fnc

					mouseleave : function(){

						console.log('mouseleave');

					} // end of mouseleave fnc

				}, // end of uiSld obj

				opt : { // options...

					onclick : function($this, $curPos){

						var $sldOpt = $m.s.sld.opt, // get slider-options reference from settings...
							$val = $this.attr('data-val'); // find the new val pos

						$m.uiAct.sld.ui.sldAni($curPos, $val); // slider animation

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

			}, // end of sld obj

			shw : { // slideshow...

				opt : { // options object...

					mouseenter : function($this){

						var $shwMod = $m.s.shw.mod, // get slideshow-module reference from settings...
							$val = $this.attr('data-val'); // get the data attribute from the current image option

							$shwMod.attr({'data-val' : $val}); // place that attribute into tje

					} // end of mouseenter fnc

				}, // end of opt obj

				img : { // image

					mouseenter : function(){

						var $shwMod = $m.s.shw.mod; // get slideshow-module reference from settings...

						$shwMod.attr({'data-state' : 'enter'});

					}, // end of mouseenter fnc

					mouseleave : function(){

						var $shwMod = $m.s.shw.mod; // get slideshow-module reference from settings...

						$shwMod.removeAttr('data-state');

					} // end of mouseleave fnc

				} // end of img obj

			}, // end of shw obj

			pie : {

				cht : {

					onclick : function($this){

						//$this.attr({'data-state' : 'enter'});

					}, // end of onclick fnc

					mouseenter : function($this){

						console.log('pie chart enter!')

						$this.attr({'data-state' : 'enter'});

					}, // end of mouseenter fnc

					mouseleave : function($this){

						$this.removeAttr('data-state');

					} // end of mouseleave fnc

				} // end of cht obj

			} // end of pie obj

		}, // end of uiAct obj

		genPie : function(){

			var $data = [['a',6], ['b',8], ['c',14], ['d',20]],
				$col = $m.s.col,
				$pieMod = $m.s.pie.mod,
				$pieLoc = null,
				$price = 0,
				$i = null;

			for($i = 0; $i < $data.length; $i++){

				$price += $data[$i][1];
			}

			//console.log('data = ' + $data[0][1]);

			for($i = 1; $i <= 4; $i++){

				$pieLoc = $pieMod.find('.pie-' + $i).find('.jqplot-container');

				$pieLoc.attr({'data-prc' : $price});

				//$m.s.pie['cht' + $i] = $.jqplot('jqplot-container-' + $i, [$data], {
				$pieLoc.jqplot([$data], {

					seriesColors : [$col.gray, $col.pink, $col.sky, $col.blue],

					seriesDefaults : {
						renderer : $.jqplot.DonutRenderer,
						shadow : false, // show shadow or not.
						rendererOptions : {
							sliceMargin : 2, // Donut's can be cut into slices like pies.
							startAngle : -90, // Pies and donuts can start at any arbitrary angle.
							showDataLabels : false, // By default, data labels show the percentage of the donut/pie.
							highlightMouseOver: false,
							highlightMouseDown: false
						}
					},

					grid : {
						background : 'transparent', // CSS color spec for background color of grid.
						borderColor : 'inherit', // CSS color spec for border around grid.
						borderWidth : 0, // pixel width of border around grid.
						shadow : false // draw a shadow for grid.
					},

					//highlighter: {
					//	show: true,
					//	formatString:'%s',
					//	tooltipLocation:'sw',
					//	useAxesFormatters:false
					//}

				});


			}


		} // end of genPie fnc

	}; // end of $m obj (the module container)

	(function(){

		$m.init(); // initialise module...

	})(); // end of anonymas function

}); // end of document.ready

/*
		genPie : function(){

			var $pieCht = null,
				$ctx = null,
				$data = [
					{
						value : 30,
						color : $m.s.col.gray
					},
					{
						value : 50,
						color : $m.s.col.pink
					},
					{
						value : 100,
						color : $m.s.col.sky
					},
					{
						value : 40,
						color : $m.s.col.blue
					}
				];



			//pie1 : $('.pie-1').find('canvas').get(0).getContext("2d")

			for(var $i = 0; $i < 4; $i++){

				$pieCht = $('.pie-' + ($i + 1)).find('canvas');

				if($m.s.ltIe9){

					console.log('run IE canvas');

					G_vmlCanvasManager.initElement($pieCht);

				}

				$ctx = $pieCht.get(0).getContext("2d");

				new Chart($ctx).Doughnut($data);

			}


			var el = document.createElement('canvas');
			G_vmlCanvasManager.initElement(el);
			var ctx = el.getContext('2d');

			var $pie1 = $m.s.pieCht.pie1,
				$pie2 = $m.s.pieCht.pie2,
				$pie3 = $m.s.pieCht.pie3,
				$pie4 = $m.s.pieCht.pie4;

			//new Chart($ctx).Doughnut($data,options);
			new Chart($pie1).Doughnut($data);
			new Chart($pie2).Doughnut($data);
			new Chart($pie3).Doughnut($data);
			new Chart($pie4).Doughnut($data);


		} // end of genPie fnc
*/