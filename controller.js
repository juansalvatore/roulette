(function($) {
	$.fn.extend({

		roulette: function(options) {

			var defaults = {
				angle: 0,
				angleOffset: -45,
				speed: 5000,
				easing: "easeInOutElastic",
			};

			var opt = $.extend(defaults, options);

			return this.each(function() {
				var o = opt;

				var data = [
					{ color: '#3f297e', text: '1' },
					{ color: '#1d61ac', text: '2' },
					{ color: '#169ed8', text: '3' },
					{ color: '#209b6c', text: '4' },
					{ color: '#60b236', text: '5' },
					{ color: '#efe61f', text: '6' },
					{ color: '#f7a416', text: '7' },
					{ color: '#e6471d', text: '8' },
					{ color: '#dc0936', text: '9' },
					{ color: '#e5177b', text: '10' },
					{ color: '#be107f', text: '11' },
					{ color: '#881f7e', text: '12' }
				];

				var $wrap = $(this),
						$btnStart = $wrap.find("#btn-start"),
						$roulette = $wrap.find(".roulette"),
						wrapW = $wrap.width(),
						angle = o.angle,
						angleOffset = o.angleOffset,
						speed = o.speed,
						esing = o.easing,
						itemSize = data.length,
						itemSelector = "item",
						labelSelector = "label",
						d = 360 / itemSize,
						borderTopWidth = wrapW,
						borderRightWidth = tanDeg(d);

				for(i=1; i<=itemSize; i+=1){
					var idx = i-1,
							rt = i*d + angleOffset,
							itemHTML = $('<div class="'+ itemSelector +'">'),
							labelHTML = '';
							labelHTML += '<p class="'+ labelSelector +'">';
							labelHTML += '	<span class="text">'+ data[idx].text +'</span>';
							labelHTML += '</p>';

					$roulette.append(itemHTML);
					$roulette.children("."+ itemSelector).eq(idx).append(labelHTML);
					$roulette.children("."+ itemSelector).eq(idx).css({
						"left": wrapW / 2,
						"top": -wrapW / 2,
						"border-top-width": borderTopWidth,
						"border-right-width": borderRightWidth,
						"border-top-color": data[idx].color,
						"transform": "rotate("+ rt + "deg)"
					});

					var textH = parseInt(((2*Math.PI*wrapW)/d)*.5);

					$roulette.children("."+ itemSelector).eq(idx).children("."+ labelSelector).css({
						"height": textH+'px',
						"lineHeight": textH+'px',
						"transform": 'translateX('+  (textH*1.03) +'px) translateY('+ (wrapW*-.25) +'px) rotateZ('+ (90 + d*.5) +'deg)'
					});

				}

				function tanDeg(deg) {
					var rad = deg * Math.PI/180;
					return wrapW / (1/Math.tan(rad));
				}


				$btnStart.on("click", function() {
					rotation();
				});

				function rotation() {

					var completeA = 360 * r(5, 10) + r(0, 360);

					$roulette.rotate({
						angle: angle,
						animateTo: completeA,
						center: ["50%", "50%"],
						easing: $.easing.esing,
						callback: function() {
							var currentA = $(this).getRotateAngle();

							console.log(currentA);

						},
						duration: speed
					});
				}

				function r(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}

			});
		}
	});
})(jQuery);

$(function() {

	$('.box-roulette').roulette();

});
