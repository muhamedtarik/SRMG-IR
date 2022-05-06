/* Share Information Page */ 
  
// historical-trading-data scroll /
(function() {
  var scrollHandle = 0,
    scrollStep = 2,
    historicalTradingDataParent = $('.historical-trading-data__data__container');
    $(".historical-trading-data__data__panner").on("mouseenter touchstart", function() {
      var data = $(this).data('scrollModifier'),
          direction = parseInt(data, 10);
      $(this).addClass('active-scroll');
      startScrolling(direction, scrollStep);
    });
    $(".historical-trading-data__data__panner").on("mouseleave", function() {
      stopScrolling();
      $(this).removeClass('active-scroll');
    });
    $(".historical-trading-data__data__container").on("touchstart click mouseenter", function() {
      stopScrolling();
      $(".historical-trading-data__data__panner").removeClass('active-scroll');
    });
    function startScrolling(modifier, step) {
      if (scrollHandle === 0) {
          scrollHandle = setInterval(function() {
              var newOffset = historicalTradingDataParent.scrollLeft() + (scrollStep * modifier);
    
              historicalTradingDataParent.scrollLeft(newOffset);
          }, 10);
      }
    }
    function stopScrolling() {
      clearInterval(scrollHandle);
      scrollHandle = 0;
    }
}());
// Change mobile popup menu to current Page name //

$(".share-information__ticker__header-tab__more").click(function () {

  $(".item span").text("Share Information");

});
/* historical Trading Calender*/
$(function() {
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        startDate: moment().subtract(30, 'days'),
        endDate: moment(),
        minDate: '01/01/2010',
        maxDate: new Date(),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD-MMM-YYYY') + labelToText + picker.endDate.format('DD-MMM-YYYY'));
        $(this).attr("start", picker.startDate.format('MM/DD/YYYY'));
        $(this).attr("ends", picker.endDate.format('MM/DD/YYYY'));
        $("#btnSearch").click();
    });
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
});

$('body').click((event) => {
    if (!$(event.target).closest('.daterangepicker').length) {
        document.querySelector('.daterangepicker').style.visibility = "unset";
    } else if (!$(event.target).closest('.daterangepicker .calendar-table table').length) {
        document.querySelector('.daterangepicker').style.visibility = "hidden";
    }
});
$('.htd__form__claneder--input').mousedown(function(e) {
    e.preventDefault();
    $(this).blur();
    return false;
});

$('.htd__form__claneder--input').click(function(e) {
    $('.daterangepicker').css("display", "flex");
});
/* END OF Share Information Page */


/* layout */
// Print Page
var printPage = function(){
  window.print();
  return false;
} 
// Scroll To Top //
$(window).scroll(function() {
  if ($(this).scrollTop() >= 200) {    
      $('#return-to-top').fadeIn(200);   
  } else {
      $('#return-to-top').fadeOut(200);   
  }
});
$('#return-to-top').click(function() {     
  $('body,html').animate({
      scrollTop : 0                       
  },250);
});
// desktop and mobile tabs //
let tabs = document.querySelectorAll(".widgets-tabs li");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".widgets-container > div");
let divsArray = Array.from(divs);
tabsArray.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      var currentTab = this.innerText;
      itemName.text(currentTab)
      tabsArray.forEach((ele) => {
          ele.classList.remove("active");
          overlayCont.classList.remove("show");
          $('body').css('overflow-y', 'scroll');
      });
      e.currentTarget.classList.add("active");
      divsArray.forEach((div) => {
          div.style.display = "none";
      });
      document.querySelector(e.currentTarget.dataset.cont).style.display = "flex";
    });
});
// mobile tabs popup //
var overlayCont = document.querySelector(".overlay-container");
var overlayInner = document.querySelector(".overlay-inner");
var wClose = document.getElementById("wClose");
var item = $('.item');
var itemName = $('.item span');
item.click(function() {
overlayCont.classList.add("show");
$('body').css('overflow-y', 'hidden');
})
wClose.addEventListener("click", function() {
overlayCont.classList.remove("show");
$('body').css('overflow-y', 'scroll');
})
overlayCont.addEventListener("click", function(e) {
if (e.target == overlayCont) {
  overlayCont.classList.remove("show");
  $('body').css('overflow-y', 'scroll');
}
})
// scroll to tob when click on mobile and desktop tabs //
$(".widgets-tabs li").click(function() {
  $([document.documentElement, document.body]).animate({
      scrollTop:0
  }, 100);
});
/* End Of Layout */


/* OVERVIEW Page */

// Shareholding Structure //
(function () {
  var scrollHandle = 0,
      scrollStep = 2,
      mainMajorShareholdersShareholderParent = $('.shareholding_structure__container__major-shareholders__data');
  $(".shareholding_structure__container__major-shareholders__panner").on("mouseenter touchstart", function () {
      var data = $(this).data('scrollModifier'),
          direction = parseInt(data, 10);
      $(this).addClass('active-scroll');
      startScrolling(direction, scrollStep);
  });
  $(".shareholding_structure__container__major-shareholders__panner").on("mouseleave", function () {
      stopScrolling();
      $(this).removeClass('active-scroll');
  });
  $(".shareholding_structure__container__major-shareholders__data").on("touchstart click mouseenter", function () {
      stopScrolling();
      $(".shareholding_structure__container__major-shareholders__panner").removeClass('active-scroll');
  });
  function startScrolling(modifier, step) {
      if (scrollHandle === 0) {
          scrollHandle = setInterval(function () {
              var newOffset = mainMajorShareholdersShareholderParent.scrollLeft() + (scrollStep * modifier);
              mainMajorShareholdersShareholderParent.scrollLeft(newOffset);
          }, 10);
      }
  }
  function stopScrolling() {
      clearInterval(scrollHandle);
      scrollHandle = 0;
  }
}());

// ticker tabs //
$(".share-information__ticker__header-tab li").click(function(){
  $(".share-information__ticker__header-tab li").removeClass("active");
  $(this).addClass("active");  
})

/* END OF OVERVIEW Page */ 
  


/* Financial Information Page */

// fS  popup //
$(".fs-chart-btn").click(function () {
});
$('.fs-popup__overlay__chart__close img').click(function () {
  $('body').removeClass('hide-scroll');
  $('.fs-popup').hide();
});
var fs_Popup = document.querySelector('.fs-popup__overlay')
fs_Popup.addEventListener("click", function (e) {
  if (e.target == fs_Popup) {
      $('.fs-popup').hide();
      $('body').removeClass('hide-scroll');
  }
});

// fr  popup //
$(".fr-chart-btn").click(function () {
  $('body').addClass('hide-scroll');
});
$('.fr-popup__overlay__chart__close img').click(function () {
  $('body').removeClass('hide-scroll');
  $('.fr-popup').hide();
});
var fr_Popup = document.querySelector('.fr-popup__overlay')
fr_Popup.addEventListener("click", function (e) {
  if (e.target == fr_Popup) {
      $('.fr-popup').hide();
      $('body').removeClass('hide-scroll');
  }
});

// Financial Statements Table scroll //
(function() {
  var scrollHandle = 0,
    scrollStep = 2,
    fs_annual_Parent = $('.fs-annual .scroll-container');
    $(".fs-annual-panner").on("mouseenter touchstart", function() {
      var data = $(this).data('scrollModifier'),
          direction = parseInt(data, 10);
      $(this).addClass('active-scroll');
      startScrolling(direction, scrollStep);
    });
    $(".fs-annual-panner").on("mouseleave", function() {
      stopScrolling();
      $(this).removeClass('active-scroll');
    });
    $(".fs-annual .scroll-container").on("touchstart click mouseenter", function() {
      stopScrolling();
      $(".fs-annual-panner").removeClass('active-scroll');
    });
    function startScrolling(modifier, step) {
      if (scrollHandle === 0) {
          scrollHandle = setInterval(function() {
              var newOffset = fs_annual_Parent.scrollLeft() + (scrollStep * modifier);
    
              fs_annual_Parent.scrollLeft(newOffset);
          }, 10);
      }
    }
    function stopScrolling() {
      clearInterval(scrollHandle);
      scrollHandle = 0;
    }
    }());

// Financial statement Currency//
$('.main-financial-statement__title__options__tabs li').click(function() {
  $('.main-financial-statement__title__options__tabs li').removeClass('active');
  $(this).addClass('active');
  });
  
  $('.main-financial-statement__title__options__tabs__usd').click(function() {
    $('.st-currency-en').text('USD M');
    $('.st-currency-ar').text('مليون دولار');
  })
  $('.main-financial-statement__title__options__tabs__riyal').click(function() {
    $('.st-currency-en').text('Riyal M');
    $('.st-currency-ar').text('مليون ريال');
  })


// accordion menu //
function showHideChild(fieldID) {
  var openAccordians = JSON.parse(sessionStorage.getItem("openAccordians")) || [];
  if ($("#btn" + fieldID).data("childviewstatus") == 'open') {
    $("tr[data-parentid='" + fieldID + "']").each(function() {
        $(this).hide();
    });   
    $("#tr" + fieldID).removeClass('fTrOpen').addClass('fTrClose');
    $("#btn" + fieldID).removeClass('fOpen').addClass('fClose');
    $("#btn" + fieldID).data("childviewstatus", 'close');
    openAccordians = jQuery.grep(openAccordians, function(acordian) {
        return acordian != "#btn" + fieldID;
    });
    sessionStorage.setItem("openAccordians", JSON.stringify(openAccordians)); 
  } else {
    $("tr[data-parentid='" + fieldID + "']").each(function() {
        $(this).show();
    });  
    $("#tr" + fieldID).removeClass('fTrClose').addClass('fTrOpen');
    $("#btn" + fieldID).removeClass('fClose').addClass('fOpen');    
    $("#btn" + fieldID).data("childviewstatus", 'open');
    if (openAccordians.indexOf("#btn" + fieldID) == -1) {
        openAccordians.push("#btn" + fieldID);
        sessionStorage.setItem("openAccordians", JSON.stringify(openAccordians));
    }    
  }
  return false;
  }  
  function showHideSubStatement(fieldID) {
  var openAccordians = JSON.parse(sessionStorage.getItem("openAccordians")) || [];
  if ($("#btn" + fieldID).data("childviewstatus") == 'open') {
    $("tr[data-SubStatatementID='" + fieldID + "']").each(function() {
        $(this).hide();
    });
  
    $("#tr" + fieldID).removeClass('fTrOpen').addClass('fTrClose');
    $("#btn" + fieldID).removeClass('fOpen').addClass('fClose');
    $("#btn" + fieldID).data("childviewstatus", 'close');
    openAccordians = jQuery.grep(openAccordians, function(acordian) {
        return acordian != "#btn" + fieldID;
    });
    sessionStorage.setItem("openAccordians", JSON.stringify(openAccordians));
  } else {
    $("tr[data-SubStatatementID='" + fieldID + "']").each(function() {
        if ($(this).data("ischildelement") == 'no') {
            $(this).show();
        }
        if ($(this).data("haschildelementdata") == 'yes') {
            var fldID = $(this).attr('id');
            fldID = fldID.substring(2);
            $("#tr" + fldID).removeClass('fTrOpen').addClass('fTrClose');
            $("#btn" + fldID).removeClass('fOpen').addClass('fClose');
            $("#btn" + fldID).data("childviewstatus", 'close')
        } 
    });
  
    $("#tr" + fieldID).removeClass('fTrClose').addClass('fTrOpen');
    $("#btn" + fieldID).removeClass('fClose').addClass('fOpen');   
    $("#btn" + fieldID).data("childviewstatus", 'open');
    if (openAccordians.indexOf("#btn" + fieldID) == -1) {
        openAccordians.push("#btn" + fieldID);
        sessionStorage.setItem("openAccordians", JSON.stringify(openAccordians));
    }
  }
  return false;
  }

// Financial Reports dropdown //
//const frSelect = document.querySelectorAll('.financial-reports__select__btn');
//const frOption = document.querySelectorAll('.financial-reports__select__dropdown__option');
//var frDropdown = document.querySelectorAll(".financial-reports__select__dropdown");
//let index = 1;
//frSelect.forEach(a => {
//    a.addEventListener('click', b => {
//        const next = b.target.nextElementSibling;
//        next.classList.toggle('toggle');
//        // next.style.zIndex = index++;
//    })
//});
//frOption.forEach(a => {
//    a.addEventListener('click', b => {
//        b.target.parentElement.classList.remove('toggle');
//        const parent = b.target.closest('.financial-reports__select').children[0];
//        parent.setAttribute('data-type', b.target.getAttribute('data-type'));
//        parent.innerText = b.target.innerText;
//    })
//});
//// active class to be bold with BG
//$(frOption).click(function () {
//  $(frOption).removeClass('active');
//  $(this).addClass('active');
//});
//// close dropdown on click outside
//$(document).click(function (e) {
//  if (!$(frSelect).is(e.target) && !$(frDropdown).is(e.target) && $(frDropdown).has(e.target).length == 0) {
//    $(frDropdown).removeClass('toggle');
//  }
//});

/* End Of Financial Information Page */



/* main calendar expand menu */

// desktop expand menu //
$('.pr__calendar__container__row__line__desktop__table__row__data__text-icon svg').click(function(){
    $(this).parents('table').parent('div').parent('div').siblings().show();
    $(this).parents('table').parent('div').siblings().find('.pr__calendar__container__row__line__mobile__container__row__data__icon--close').show();
    $(this).parents('table').parent('div').siblings().find('.pr__calendar__container__row__line__mobile__container__row__data__icon--open').hide();
    $(this).siblings().show();
    $(this).hide();

})
$('.pr__calendar__container__row__line__desktop__table__row__data__text-icon--close').click(function(){
  $(this).parents('table').parent('div').parent('div').siblings().hide();
  $(this).parents('table').parent('div').siblings().find('.pr__calendar__container__row__line__mobile__container__row__data__icon--close').hide();
  $(this).parents('table').parent('div').siblings().find('.pr__calendar__container__row__line__mobile__container__row__data__icon--open').show();
  $(this).siblings().show();
  $(this).hide();

})

// mobile expand menu//
$('.pr__calendar__container__row__line__mobile__container__row__data__icon svg').click(function(){
  $(this).parents('span').parent('div').parent('div').parent('div').parent('div').siblings().show();
  $(this).parents('span').parent('div').parent('div').parent('div').siblings().find('.pr__calendar__container__row__line__desktop__table__row__data__text-icon--close').show();
  $(this).parents('span').parent('div').parent('div').parent('div').siblings().find('.pr__calendar__container__row__line__desktop__table__row__data__text-icon--open').hide();
  $(this).siblings().show();
  $(this).hide();
})
$('.pr__calendar__container__row__line__mobile__container__row__data__icon--close').click(function(){
  $(this).parents('span').parent('div').parent('div').parent('div').parent('div').siblings().hide();
  $(this).parents('span').parent('div').parent('div').parent('div').siblings().find('.pr__calendar__container__row__line__desktop__table__row__data__text-icon--close').hide();
  $(this).parents('span').parent('div').parent('div').parent('div').siblings().find('.pr__calendar__container__row__line__desktop__table__row__data__text-icon--open').show();
  $(this).siblings().show();
  $(this).hide();
})

// Calendar popup //
$(".calender__container__text__companies__last").click(function(){
  $('body').addClass('hide-scroll');
  $('.Calendar-popup').show();
})
$('.Calendar-popup--close').click(function(){
  $('body').removeClass('hide-scroll');
  $('.Calendar-popup').hide();
})
var calendar_Popup = document.querySelector('.Calendar-popup__overlay')
calendar_Popup.addEventListener("click", function (e) {
  if (e.target == calendar_Popup) {
      $('.Calendar-popup').hide();
      $('body').removeClass('hide-scroll');
  }
})


/* END OF MAIN DISCLOSURES TAB */ 


/* Subscription Center Page */
  //Subscription Center__select//
$(".subscription-center__custom--country__select").click(function() {
  $(".subscription-center__custom--country__select").css("color", "#101010");
});
/* End of Subscription Center Page */
