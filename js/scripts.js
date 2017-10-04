var ThemeClass = function(fontColor, mainBorderSize, mainBg, mainBorderColor, logoUrls, headingColor, ctaBg, buttonColor, borderRadius, buttonBgColor, footerColor, footerBg, footerButtonColor, footerButtonBorder, footerButtonBgColor, footerBorderColor) {
	this['font-color'] = fontColor;
	this['main-border-size'] = mainBorderSize;
	this['main-bg'] = mainBg;
	this['main-border-color'] = mainBorderColor;
	this['logo-urls'] = logoUrls;
	this['heading-color'] = headingColor;
	this['button-color'] = buttonColor;
	this['cta-bg'] = ctaBg;
	this['border-radius'] = borderRadius;
	this['button-bg-color'] = buttonBgColor;
	this['footer-color'] = footerColor;
	this['footer-bg'] = footerBg;
	this['footer-button-bg-color'] = footerButtonBgColor;
	this['footer-button-color'] = footerButtonColor;
	this['footer-button-border'] = footerButtonBorder;
	this['footer-border-color'] = footerBorderColor;
};

$(function() {

	// Initialize all the theme variables
	var $fontColor, $mainBorderSize, $mainBg, $mainBorderColor, $logoUrls, $headingColor, $ctaBg, $buttonColor, $borderRadius, $buttonBgColor, $footerColor, $footerBg, $footerButtonColor, $footerButtonBorder, $footerButtonBgColor
	// Build the Preview on page load
	var inputData = getFormValues();


  // Default theme that is called on page load
  var defaultTheme = new ThemeClass("#101010","20","#FFFFFF","#999999","http://placehold.it/200X200","#101010","#F2F2F2","#FFFFFF","25","#999999","#575757","#F2F2F2","#555555","#999999","#FAFAFA","#DDDDDD");

  // Calling the initial theme on page load
	makeRequest(defaultTheme);

	// Custom Themes

	var summerTheme = new ThemeClass("#0B3836","20","#20A39E","#FFBA49","http://placehold.it/200X200","#FFBA49","#F2ECD3","#166E6A","25","#FFBA49","#0B3836","#FFBA49","#20A39E","#999999","#F2ECD3","#FFBA49");

	var darkTheme = new ThemeClass("#111111","10","#101010","#000000","http://placehold.it/200X200","#FFFFFF","#FFFFFF","#FFFFFF","10","#101010","#FFFFFF","#101010","#AAAAAA","#AAAAAA","#101010","#101010");

	var moonTheme = new ThemeClass("#101010","0","#F2F2F2","#999999","http://placehold.it/200X200","#666","#FFFFFF","#5C5C5C","25","#E0E0E0","#666666","#F2F2F2","#666666","#E0E0E0","#FFFFFF","#DDDDDD");

	var boldTheme = new ThemeClass("#101010","20","#B02A1D","#DD3626","http://placehold.it/200X200","#FFFFFF","#F2F2F2","#FFFFFF","5","#DD3626","#575757","#EDEDED","#DD3626","#DD3626","#EDEDED","#DDDDDD");

	var blueTheme = new ThemeClass("#212121","5","#1A237E","#1A237E","http://placehold.it/200X200","#FFFFFF","#FFFFFF","#FFFFFF","0","#1A237E","#FFFFFF","#1A237E","#FFFFFF","#FFFFFF","#1A237E","#1A237E");

	var googleTheme = new ThemeClass("#212121","10","#795548","#5D4037","http://placehold.it/200X200","#FFFFFF","#FFFFFF","#FFFFFF","25","#4CAF50","#FFFFFF","#5D4037","#FFFFFF","#4CAF50","#4CAF50","#5D4037");

	var amberTheme = new ThemeClass("#613D00","10","#FDFFD1","#FF5722","http://placehold.it/200X200","#FF5722","#FDFFD1","#FDFFD1","25","#FFA000","#FDFFD1","#FF5722","#FF5722","#FFA000","#FFA000","#FF5722");

	var pinkTheme = new ThemeClass("#EEEEEE","10","#E91E63","#E91E63","http://placehold.it/200X200","#FCE4EC","#263238","#FCE4EC","15","#E91E63","#EEEEEE","#263238","#E91E63","#FCE4EC","#FCE4EC","#DDDDDD");

// Themes Object,carrying all the different themes
	var themes = {
		defaultTheme: defaultTheme,
		summerTheme: summerTheme,
		darkTheme: darkTheme,
		moonTheme: moonTheme,
		boldTheme: boldTheme,
		blueTheme: blueTheme,
		googleTheme: googleTheme,
		amberTheme: amberTheme,
		pinkTheme: pinkTheme
	};

	// Listen for a change on all the input of our form
	$('input').keyup(function() {
		processResults($(this));
	});
	$('input').change(function() {
		processResults($(this));
	});

// Listen for a change on the template selector
	$('#emailTemplates').change(function() {
		makeRequest(getFormValues());
	});

// Copy Text
	$('#copy-text').click(function() {
		copyToClipboard($('#results'));
	});

	$('#importFiles').on('change', function(e) {
		if(e.target.files.length >= 1) {
			$('#fileLabel').text(e.target.files[0].name);
			$('#import').addClass('btn-primary');
		}

		else {
			$('#fileLabel').text('No files selected');
			$('#import').removeClass('btn-primary');
		}
	});

	$('#import').on('click', function(e) {
		e.preventDefault();
		var files = document.getElementById('importFiles').files;
		if(files.length <= 0) {
			alert('Please select a valid JSON theme file in order to import it');
			return false;
		}
		var fileName = (document.getElementById('importFiles').files)[0].name;
		var fileExt = fileName.substring(fileName.lastIndexOf('.'));
		var fileExt = fileExt.toLowerCase();
		if(fileExt !== '.json') {
			alert('Please select a valid JSON theme file in order to import it');
			return false;
		}

		var fr = new FileReader();

		fr.onload = function(e) {
			var result = JSON.parse(e.target.result);
			setFormValues(result);
			$('[name="custom-themes"]:checked').removeAttr('checked').prop('checked', false);
			makeRequest(result);
		};

		fr.readAsText(files[0]);

	});

// Process results on all changes
function processResults(elem) {
	// Listen for the changes on the custom themes
	if(elem.attr('name') === 'custom-themes') {
			var themeName = elem.val();
			setFormValues(themes[themeName]);
			makeRequest(themes[themeName]);
	}
	// Else it should be coming from the forms
	else {
		$('[name="custom-themes"]:checked').removeAttr('checked').prop('checked', false);
		var inputVal = elem.val();
		if(elem.hasClass('number') && isNaN(inputVal)) {
			elem.val(inputVal.match(/[0-9]*/));
			makeRequest(getFormValues());
		}
		// If the input is based on color
		else if(elem.hasClass('jscolor')) {
    		var inputId = elem.attr('id');
	    	var userValue = getFormValues();
	    	if(inputVal.indexOf('#') < 0) {
	    		userValue[inputId] = '#' + userValue[inputId];
	    	}
			makeRequest(userValue);
    	}

    	else {
    		makeRequest(getFormValues());
    	}
	}
}

// Copy to Clipboard helper function
function copyToClipboard(elem) {
	 var copyTextarea = elem;
	 copyTextarea.select();

	 try {
	   var successful = document.execCommand('copy');
	   var msg = successful ? 'successful' : 'unsuccessful';
	   console.log('Copying text command was ' + msg);
	 } catch (err) {
	   console.log('Oops, unable to copy');
	 }
	 copyTextarea.disabled = true;
}

// Make the AJAX call
function makeRequest(inputData) {
	
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inputData));
	$('#saveTheme').attr("href", dataStr);

	// Check which template is selected
	var temp = $('#emailTemplates').val();
	// Call the template
	var templateFile = './js/templates/' + temp + '.hbs';

	// Make the AJAX call
	$.ajax({
	    	url: templateFile
	    }).done(function(templateData) {
	    	// Compile the template
			var template = Handlebars.compile(templateData);
	    	var result = template(inputData);
	    	// Output the result on to the page
			$('#results').val(result);
			$('#preview').html(result);

			// Different display for emails with tables
			var custom_table = document.querySelector('.custom-table');
			if(custom_table) {
				custom_table.innerHTML = '<table width="100%"><thead><tr><th>Product Image</th><th>Product Name</th><th>Variant Title</th><th>SKU</th><th>Price</th><th>Quantity</th></tr></thead><tbody><tr><td><img src="http://via.placeholder.com/100x100" style="max-width:100px; max-height:100px;"></td><td>Product A</td><td>Default Title</td><td></td><td>$79.99</td><td>2</td></tr><tr><td><img src="http://via.placeholder.com/100x100" style="max-width:100px; max-height:100px;"></td><td>Product B</td><td>Default Title</td><td></td><td>$14.99</td><td>1</td></tr><tr><td><img src="http://via.placeholder.com/100x100" style="max-width:100px; max-height:100px;"></td><td>Product C</td><td>Default Title</td><td></td><td>$14.99</td><td>2</td></tr></tbody></table>';
			}

			// Different display for the Product Update Email
			var custom_table_change = document.querySelector('.custom-table-change');
			if(custom_table_change) {
				custom_table_change.innerHTML = '<table><tbody><tr><td>Your Awesome Product</td><td>$99.99</td></tr></tbody></table>';
			}
	    });
}

// Get the form values
function getFormValues() {
		$fontColor = $('#font-color').val();
		$mainBorderSize = $('#main-border-size').val();
		$mainBg = $('#main-bg').val();
		$mainBorderColor = $('#main-border-color').val();
		$logoUrls = $('#logo-urls').val();
		$headingColor = $('#heading-color').val();
		$ctaBg = $('#cta-bg').val();
		$buttonColor = $('#button-color').val();
		$borderRadius = $('#border-radius').val();
		$buttonBgColor = $('#button-bg-color').val();
		$footerColor = $('#footer-color').val();
		$footerBg = $('#footer-bg').val();
		$footerButtonColor = $('#footer-button-color').val();
		$footerButtonBorder = $('#footer-button-border').val();
		$footerButtonBgColor = $('#footer-button-bg-color').val();
		$footerBorderColor = $('#footer-border-color').val();

		// Validation for the empty inputs and insert the default values
		if($mainBorderSize === '') {
			$mainBorderSize = '20';
		}

		if($borderRadius === '') {
			$borderRadius = '25';
		}

		// Make the object with the inputted values

		var inputDataObject = new ThemeClass($fontColor, $mainBorderSize, $mainBg, $mainBorderColor, $logoUrls, $headingColor, $ctaBg, $buttonColor, $borderRadius, $buttonBgColor, $footerColor, $footerBg, $footerButtonColor, $footerButtonBorder, $footerButtonBgColor, $footerBorderColor);

		return inputDataObject;
	}

	// Set the form values
	function setFormValues(theme) {
		$('#font-color').val(theme['font-color']);
		$('#main-border-size').val(theme['main-border-size']);
		$('#main-bg').val(theme['main-bg']);
		$('#main-border-color').val(theme['main-border-color']);
		$('#logo-urls').val(theme['logo-urls']);
		$('#heading-color').val(theme['heading-color']);
		$('#cta-bg').val(theme['cta-bg']);
		$('#button-color').val(theme['button-color']);
		$('#border-radius').val(theme['border-radius']);
		$('#button-bg-color').val(theme['button-bg-color']);
		$('#footer-color').val(theme['footer-color']);
		$('#footer-bg').val(theme['footer-bg']);
		$('#footer-button-color').val(theme['footer-button-color']);
		$('#footer-button-border').val(theme['footer-button-border']);
		$('#footer-button-bg-color').val(theme['footer-button-bg-color']);
		$('#footer-border-color').val(theme['footer-border-color']);

		// Get all the color inputs
		var colorInputs = $('.jscolor');

		var hexValue, foregroundColor;
		$.each(colorInputs, function(i, colorInput) {
			hexValue = $(this).val();
			foregroundColor = reverseColor(hexValue);

			// Set the foreground color based on what the result returns form the reverseColor function
		    $(this).css({
		    	'background': hexValue,
		    	'color': foregroundColor
		    });
		});
	}

	// Reverse Color Helper Function
	function reverseColor(hexColor) {
		var r = parseInt(hexColor.substr(1,2),16);
		var g = parseInt(hexColor.substr(3,2),16);
		var b = parseInt(hexColor.substr(6,4),16);
		var yiq = ((r*300)+(g*587)+(b*114))/1000;
		return (yiq >= 128) ? 'black' : 'white';
	}

});