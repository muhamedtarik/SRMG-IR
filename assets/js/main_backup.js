// $(".overview-link").click(function() {
//   targetDiv = $(this).attr('data-link');
//   $('html, body').animate({
//       scrollTop: $('#'+targetDiv).offset().top - headerHeight
//   }, 300);
// });


/* Overview Navs */
let overviewLinkTabs = document.querySelectorAll(".overview-link");
let overviewLinkTabsArray = Array.from(overviewLinkTabs);
let overviewLinkDivs = document.querySelectorAll(".overview > div");
let overviewLinkDivsArray = Array.from(overviewLinkDivs);
overviewLinkTabsArray.forEach((ele) => {
ele.addEventListener("click", function(e) {
  overviewLinkTabsArray.forEach((ele) => {
      ele.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
  overviewLinkDivsArray.forEach((div) => {
      div.style.display = "none";
  });
  document.querySelector(e.currentTarget.dataset.cont).style.display = "flex";
  $([document.documentElement, document.body]).animate({
    scrollTop:2
}, 100)
});
});
/* end of stock-information tabs */


/* Overview Nav scroll */
(function() {
  var scrollHandle = 0,
    scrollStep = 2,
    overviewNavParent = $('.overview-nav-scroll-container');
  //Start the scrolling process
  $(".overview-nav-container__panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".overview-nav-container__panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".overview-nav-scroll-container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".overview-nav-container__panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
    if (scrollHandle === 0) {
        scrollHandle = setInterval(function() {
            var newOffset = overviewNavParent.scrollLeft() + (scrollStep * modifier);
            overviewNavParent.scrollLeft(newOffset);
        }, 10);
    }
  }
  
  function stopScrolling() {
    clearInterval(scrollHandle);
    scrollHandle = 0;
  }
  }());
/* End Of Overview Nav scroll */


/* Start Of docked-menu*/
let dockedMenuPopup = $(".docked-menu-popup");
// Open Docked Menu Popup //
$('.docked-menu').click(function() {
  $(".docked-menu-popup").addClass("show");
  $('body').addClass('hide-scroll');
})
// Close Docked Menu Popup //
$(".docked-menu-popup__overlay__close").click(function(){
  $(".docked-menu-popup").removeClass("show");
  $('body').removeClass('hide-scroll');
})
// Close Docked Menu Popup //
$(".docked-menu-popup").on("click", function(e) {
  if($(e.target).is(".docked-menu-popup")) {
    $(".docked-menu-popup").removeClass("show");
    $('body').removeClass('hide-scroll');
  }
});
// Change Docked Menu Name //
$('.docked-menu-popup__overlay__links__link').click(function(){
  $('.docked-menu__item span').text(this.innerText)
  $(".docked-menu-popup").removeClass('show');
  $('body').css('overflow-y', 'scroll');
})

// Hide Docked Menu when Overview Tab Is Not Active // 
$('.drop-down li').click(function(){
  $('.docked-menu').addClass('hide');
})
$('.drop-down--overview').click(function(){
  $('.docked-menu').removeClass('hide');
})
/* End of docked-menu */

/* Scroll To Top */
$(window).scroll(function() {
  if ($(this).scrollTop() >= 200 && $('.widgets-container .overview').css('display') === 'none' ) {    
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

/* End Of Scroll To Top */


/* Start OF Sticky Header */
// set top to side-bar depends on height of sticky header //
var headerHeight = $('.header-sticky').outerHeight(true);
$(".desktop-tabs").css('top', headerHeight + "px");
$('.overview-section').css('min-height', `calc(100vh - ${(headerHeight - 70) +"px" })`);

// Start of change header-sticky background //
$(window).on("scroll", function() {
  if($(window).scrollTop() > 1) {
      $(".header-sticky").addClass("header-sticky-change");
      $('.company-img').addClass("company-img-change");
      $(".drop-down").addClass('drop-down-change');
      $('.drop-down li').addClass('drop-down-list-change');
      $('#wClose path').addClass('drop-down-close-change');
  } else {
     $(".header-sticky").removeClass("header-sticky-change");
     $('.company-img').removeClass("company-img-change");
     $(".drop-down").removeClass('drop-down-change');
     $('.drop-down li').removeClass('drop-down-list-change');
     $('#wClose path').removeClass('drop-down-close-change');

  }
});


// Hide stickuy header when reach footer //
$(window).scroll(function() {
  var footerOffset=$('footer').offset().top;
  var headerStickyHeight = $('.header-sticky ').outerHeight(true)+70;
  var windowScroll = $(window).scrollTop();
  var footerDistance =  footerOffset - windowScroll;
  
  if(footerDistance <= headerStickyHeight){
    $('.side-bar-header').addClass('side-bar-header-change');
  }else{
    $('.side-bar-header').removeClass('side-bar-header-change');
  }
});

/* End OF Sticky Header */

/* desktop and mobile tabs */
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
/* End of desktop and mobile tabs */


/* mobile tabs popup */
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
/* End of mobile tabs popup */

/* scroll to tob when click on mobile and desktop tabs */
$(".widgets-tabs li").click(function() {
  $([document.documentElement, document.body]).animate({
      scrollTop:2
  }, 100);
});
/* End of scroll to tob when click on mobile and desktop tabs */


/* data picker */
  $(function() {
    $('input.calendar').pignoseCalendar({
      format: 'YYYY-MM-DD',
      theme: 'dark',
    });
    });
    moment().format('YYYY-MM-DD');
/* end of data picker */
    


/* START OF OVERVIEW TAB */

// ticker tabs //
$(".ticker__header-tab li").click(function(){

  $(".ticker__header-tab li").removeClass("active");
  $(this).addClass("active");
  
})

/* END OF OVERVIEW TAB */ 
  
  
/* START OF PROFILE TAB */ 

// stock-information tabs //
let stockInformationTabs = document.querySelectorAll(".stock-information-tabs li");
let stockInformationTabsArray = Array.from(stockInformationTabs);
let stockInformationDivs = document.querySelectorAll(".stock-information__container > div");
let stockInformationDivsArray = Array.from(stockInformationDivs);
stockInformationTabsArray.forEach((ele) => {
ele.addEventListener("click", function(e) {
  stockInformationTabsArray.forEach((ele) => {
      ele.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
  stockInformationDivsArray.forEach((div) => {
      div.style.display = "none";
  });
  document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
});
});


// Financials Highlights riyal scroll //
  (function() {
  var scrollHandle = 0,
    scrollStep = 2,
    financialsHighlightsRiyalParent = $('.Financials-Highlights__riyal__container');
  //Start the scrolling process
  $(".Financials-Highlights__riyal__panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".Financials-Highlights__riyal__panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".Financials-Highlights__riyal__container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".Financials-Highlights__riyal__panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
    if (scrollHandle === 0) {
        scrollHandle = setInterval(function() {
            var newOffset = financialsHighlightsRiyalParent.scrollLeft() + (scrollStep * modifier);
            financialsHighlightsRiyalParent.scrollLeft(newOffset);
        }, 10);
    }
  }
  
  function stopScrolling() {
    clearInterval(scrollHandle);
    scrollHandle = 0;
  }
  }());

// Financials-Highlights tabs //
  $('.Financials-Highlights-tabs li').click(function(){
    $('.Financials-Highlights-tabs li').removeClass('active');
    $(this).addClass('active');
  })

// change type of currency for profile financial highlights en //
$('.Financials-Highlights-tabs__usd-en').click(function () {
  $('.Financials-Highlights__currency__type-en').html('(M USD)');
})
$('.Financials-Highlights-tabs__riyal-en').click(function () {
  $('.Financials-Highlights__currency__type-en').html('(M SAR)');
})
// change type of currency for profile financial highlights ar //
$('.Financials-Highlights-tabs__usd-ar').click(function () {
  $('.Financials-Highlights__currency__type-ar').html('(مليون دولار)');
})
$('.Financials-Highlights-tabs__riyal-ar').click(function () {
  $('.Financials-Highlights__currency__type-ar').html('(مليون ريال)');
})
  
// Financials-Highlights chart popup //
$(".Financials-Highlights__table__row__data__text__icon").click(function(){
  $('body').addClass('hide-scroll');
  $('.Financials-Highlights__popup').show();
})
$('.Financials-Highlights__popup__overlay__chart__close img').click(function(){
  $('body').removeClass('hide-scroll');
  $('.Financials-Highlights__popup').hide();
})
var fH_Popup = document.querySelector('.Financials-Highlights__popup__overlay')
fH_Popup.addEventListener("click", function (e) {
  if (e.target == fH_Popup) {
      $('.Financials-Highlights__popup').hide();
      $('body').removeClass('hide-scroll');
  }
})

/* END OF PROFILE TAB */


/* START OF CHART TAB */ 
/* main-chart select dropdown */
const select = document.querySelectorAll('.main-chart__options__select__btn');
const option = document.querySelectorAll('.main-chart__options__select__dropdown__option');
let index = 1;

select.forEach(a => {
    a.addEventListener('click', b => {
        const next = b.target.nextElementSibling;
        next.classList.toggle('toggle');
        next.style.zIndex = index++;
    })
});

option.forEach(a => {
    a.addEventListener('click', b => {
        b.target.parentElement.classList.remove('toggle');

        const parent = b.target.closest('.main-chart__options__select').children[0];
        parent.setAttribute('data-type', b.target.getAttribute('data-type'));
        parent.innerText = b.target.innerText;
    })
});
/* end of main-chart select dropdown */
/* add class active to main-chart select dropdown to be bold */
$('.main-chart__options__select__dropdown__option').click(function () {
  $('.main-chart__options__select__dropdown__option').removeClass('active');
  $(this).addClass('active');
});
/* end of add class active to main-chart select dropdown to be bold */


/* main-chart tabs */
  $('.main-chart__periods li').click(function(){
      $('.main-chart__periods li').removeClass('active');
      $(this).addClass('active');
  })
/* end of main-chart tabs */


/* data picker */
  $(function() {
    $('input.calendar').pignoseCalendar({
      format: 'YYYY-MM-DD',
      theme: 'dark',
    });
    });
    moment().format('YYYY-MM-DD');
/* end of data picker */
    
  
  
/* chartFinancialsHighlights scroll */
  (function() {
  var scrollHandle = 0,
    scrollStep = 2,
    chartFinancialsHighlightsParent = $('.chart-financials-highlights__data__container');
  //Start the scrolling process
  $(".chart-financials-highlights__data__panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".chart-financials-highlights__data__panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".chart-financials-highlights__data__container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".chart-financials-highlights__data__panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
    if (scrollHandle === 0) {
        scrollHandle = setInterval(function() {
            var newOffset = chartFinancialsHighlightsParent.scrollLeft() + (scrollStep * modifier);
  
            chartFinancialsHighlightsParent.scrollLeft(newOffset);
        }, 10);
    }
  }
  
  function stopScrolling() {
    clearInterval(scrollHandle);
    scrollHandle = 0;
  }
  }());
/* end of chartFinancialsHighlights scroll */
/* END OF CHART TAB */


/* Financial Statemenets Tab */

/* fS chart popup */
$(".fs-chart-btn").click(function () {
  $('body').addClass('hide-scroll');
  $('.fs-popup').show();
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
/* End of fS chart popup */

/* Main Financial statement tabs currency */

$('.main-financial-statement__title__options__tabs li').click(function() {
  $('.main-financial-statement__title__options__tabs li').removeClass('active');
  $(this).addClass('active');
  });
  
  $('.main-financial-statement__title__options__tabs__usd').click(function() {
  $('.ra-currency').text('USD')
  })
  $('.main-financial-statement__title__options__tabs__riyal').click(function() {
  $('.ra-currency').text('Riyal')
  })
  
  /*  end of Main Financial statement tabs currency */


  /* Main Financial statement tabs */
let mainFinancialstatementTabs = document.querySelectorAll(".main-financial-statement__tabs li");
let mainFinancialstatementTabsArray = Array.from(mainFinancialstatementTabs);
let mainFinancialstatementDivs = document.querySelectorAll("#financialStatementMain > div");
let mainFinancialstatementDivsArray = Array.from(mainFinancialstatementDivs);
mainFinancialstatementTabsArray.forEach((ele) => {
ele.addEventListener("click", function(e) {
  mainFinancialstatementTabsArray.forEach((ele) => {
      ele.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
  mainFinancialstatementDivsArray.forEach((div) => {
      div.style.display = "none";
  });
  document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
});
});
/* End Of Main Financial statement tabs */

/* fs-annual-scroll scroll */
(function() {
  var scrollHandle = 0,
    scrollStep = 2,
    fs_annual_Parent = $('.fs-annual .scroll-container');
  //Start the scrolling process
  $(".fs-annual-panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".fs-annual-panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".fs-annual .scroll-container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".fs-annual-panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
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
  /* end of fs-annual-scroll scroll */

  /* fs-quarter-scroll scroll */
(function() {
  var scrollHandle = 0,
    scrollStep = 2,
    fs_quarter_Parent = $('.fs-quarter .scroll-container');
  //Start the scrolling process
  $(".fs-quarter-panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".fs-quarter-panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".fs-quarter .scroll-container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".fs-quarter-panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
    if (scrollHandle === 0) {
        scrollHandle = setInterval(function() {
            var newOffset = fs_quarter_Parent.scrollLeft() + (scrollStep * modifier);
  
            fs_quarter_Parent.scrollLeft(newOffset);
        }, 10);
    }
  }
  
  function stopScrolling() {
    clearInterval(scrollHandle);
    scrollHandle = 0;
  }
  }());
  /* end of fs-quarter-scroll scroll */

  /* fs-interim-scroll scroll */
(function() {
  var scrollHandle = 0,
    scrollStep = 2,
    fs_interim_Parent = $('.fs-interim .scroll-container');
  //Start the scrolling process
  $(".fs-interim-panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".fs-interim-panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".fs-interim .scroll-container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".fs-interim-panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
    if (scrollHandle === 0) {
        scrollHandle = setInterval(function() {
            var newOffset = fs_interim_Parent.scrollLeft() + (scrollStep * modifier);
  
            fs_interim_Parent.scrollLeft(newOffset);
        }, 10);
    }
  }
  
  function stopScrolling() {
    clearInterval(scrollHandle);
    scrollHandle = 0;
  }
  }());
  /* end of fs-interim-scroll scroll */

/* End Of Financial Statemenets Tab */


/* Financial Ratios Tab */
/* accordion menu */
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
     
    /* end of accordion menu */
    
 
  /* Main Financial ratio tabs */
  let mainFinancialratioTabs = document.querySelectorAll(".main-financial-ratio__tabs li");
  let mainFinancialratioTabsArray = Array.from(mainFinancialratioTabs);
  let mainFinancialratioDivs = document.querySelectorAll("#financialRatioMain > div");
  let mainFinancialratioDivsArray = Array.from(mainFinancialratioDivs);
  mainFinancialratioTabsArray.forEach((ele) => {
  ele.addEventListener("click", function(e) {
    mainFinancialratioTabsArray.forEach((ele) => {
        ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    mainFinancialratioDivsArray.forEach((div) => {
        div.style.display = "none";
    });
    document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
  });
  });
  /* End Of Main Financial ratio tabs */
  
  
  
  /* ra-annual-scroll scroll */
  (function() {
  var scrollHandle = 0,
    scrollStep = 2,
    ra_annual_Parent = $('.ra-annual .scroll-container');
  //Start the scrolling process
  $(".ra-annual-panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".ra-annual-panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".ra-annual .scroll-container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".ra-annual-panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
    if (scrollHandle === 0) {
        scrollHandle = setInterval(function() {
            var newOffset = ra_annual_Parent.scrollLeft() + (scrollStep * modifier);
  
            ra_annual_Parent.scrollLeft(newOffset);
        }, 10);
    }
  }
  
  function stopScrolling() {
    clearInterval(scrollHandle);
    scrollHandle = 0;
  }
  }());
  /* end of ra-annual-scroll scroll */
  
  /* ra-trailing-scroll scroll */
  (function() {
  var scrollHandle = 0,
    scrollStep = 2,
    ra_trailing_Parent = $('.ra-trailing .scroll-container');
  //Start the scrolling process
  $(".ra-trailing-panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".ra-trailing-panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".ra-trailing .scroll-container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".ra-trailing-panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
    if (scrollHandle === 0) {
        scrollHandle = setInterval(function() {
            var newOffset = ra_trailing_Parent.scrollLeft() + (scrollStep * modifier);
  
            ra_trailing_Parent.scrollLeft(newOffset);
        }, 10);
    }
  }
  
  function stopScrolling() {
    clearInterval(scrollHandle);
    scrollHandle = 0;
  }
  }());
  /* end of ra-trailing-scroll scroll */
  
  /* ra-annualized-scroll scroll */
  (function() {
  var scrollHandle = 0,
    scrollStep = 2,
    ra_annualized_Parent = $('.ra-annualized .scroll-container');
  //Start the scrolling process
  $(".ra-annualized-panner").on("mouseenter touchstart", function() {
    var data = $(this).data('scrollModifier'),
        direction = parseInt(data, 10);
    $(this).addClass('active-scroll');
    startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".ra-annualized-panner").on("mouseleave", function() {
    stopScrolling();
    $(this).removeClass('active-scroll');
  });
  $(".ra-annualized .scroll-container").on("touchstart click mouseenter", function() {
    stopScrolling();
    $(".ra-annualized-panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
    if (scrollHandle === 0) {
        scrollHandle = setInterval(function() {
            var newOffset = ra_annualized_Parent.scrollLeft() + (scrollStep * modifier);
  
            ra_annualized_Parent.scrollLeft(newOffset);
        }, 10);
    }
  }
  
  function stopScrolling() {
    clearInterval(scrollHandle);
    scrollHandle = 0;
  }
  }());
  /* end of ra-annualized-scroll scroll */



  /* Main Financial ratio tabs currency */

$('.main-financial-ratio__title__options__tabs li').click(function() {
  $('.main-financial-ratio__title__options__tabs li').removeClass('active');
  $(this).addClass('active');
  });
  
  $('.main-financial-ratio__title__options__tabs__usd').click(function() {
  $('.ra-currency').text('USD')
  })
  $('.main-financial-ratio__title__options__tabs__riyal').click(function() {
  $('.ra-currency').text('Riyal')
  })
  
  /*  end of Main Financial ratio tabs currency */



  /* FR chart popup */
$(".fr-chart-btn").click(function () {
  $('body').addClass('hide-scroll');
  $('.fr-popup').show();
});
$('.fr-popup__overlay__chart__close img').click(function () {
  $('body').removeClass('hide-scroll');
  $('.fr-popup').hide();

});
var FR_Popup = document.querySelector('.fr-popup__overlay')
FR_Popup.addEventListener("click", function (e) {
  if (e.target == FR_Popup) {
      $('.fr-popup').hide();
      $('body').removeClass('hide-scroll');
  }
});
/* End of FR chart popup */


/* End Of Financial Ratios Tab */


/* START OF FINANCIAL REPORTS */


/* financialReports scroll */
(function () {
  var scrollHandle = 0,
      scrollStep = 2,
      financialReportsParent = $('.financial-reports__container');
  //Start the scrolling process
  $(".financial-reports__panner").on("mouseenter touchstart", function () {
      var data = $(this).data('scrollModifier'),
          direction = parseInt(data, 10);
      $(this).addClass('active-scroll');
      startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".financial-reports__panner").on("mouseleave", function () {
      stopScrolling();
      $(this).removeClass('active-scroll');
      $(".financial-reports__container").on("touchstart click mouseenter", function () {
          stopScrolling();
          $(".financial-reports__panner").removeClass('active-scroll');
      });
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
      if (scrollHandle === 0) {
          scrollHandle = setInterval(function () {
              var newOffset = financialReportsParent.scrollLeft() + (scrollStep * modifier);
              financialReportsParent.scrollLeft(newOffset);
          }, 10);
      }
  }

  function stopScrolling() {
      clearInterval(scrollHandle);
      scrollHandle = 0;
  }
}());
/* end of financialReports scroll */

/* END OF FINANCIAL REPORTS */


/* START OF Corporate-Actions */

/* Main-Corporate-Actions tabs */
let mainCorporateActionsTabs = document.querySelectorAll(".main-corporate-actions__tabs li");
let mainCorporateActionsTabsArray = Array.from(mainCorporateActionsTabs);
let mainCorporateActionsDivs = document.querySelectorAll(".main-corporate-actions__container > div");
let mainCorporateActionsDivsArray = Array.from(mainCorporateActionsDivs);
mainCorporateActionsTabsArray.forEach((ele) => {
    ele.addEventListener("click", function (e) {
        mainCorporateActionsTabsArray.forEach((ele) => {
            ele.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        mainCorporateActionsDivsArray.forEach((div) => {
            div.style.display = "none";
        });
        document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
    });
});
/* End Of Main-Corporate-Actions tabs */

/* corporateActionsTabs */
let corporateActionsTabs = document.querySelectorAll(".corporate-actions__tabs li");
let corporateActionsTabsArray = Array.from(corporateActionsTabs);
let corporateActionsDivs = document.querySelectorAll(".corporate-actions__container > ul");
let corporateActionsDivsArray = Array.from(corporateActionsDivs);
corporateActionsTabsArray.forEach((ele) => {
    ele.addEventListener("click", function (e) {
        corporateActionsTabsArray.forEach((ele) => {
            ele.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        corporateActionsDivsArray.forEach((ul) => {
            ul.style.display = "none";
        });
        document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
    });
});
/* End Of corporateActionsTabs */


/* main-corporate-actions__capital-changes scroll */
(function () {
    var scrollHandle = 0,
        scrollStep = 2,
        capitalChangesParent = $('.main-corporate-actions__capital-changes');
    //Start the scrolling process
    $(".main-corporate-actions__panner").on("mouseenter touchstart", function () {
        var data = $(this).data('scrollModifier'),
            direction = parseInt(data, 10);
        $(this).addClass('active-scroll');
        startScrolling(direction, scrollStep);
    });
    //Kill the scrolling
    $(".main-corporate-actions__panner").on("mouseleave", function () {
        stopScrolling();
        $(this).removeClass('active-scroll');
    });
    $(".main-corporate-actions__capital-changes").on("touchstart click mouseenter", function () {
        stopScrolling();
        $(".main-corporate-actions__panner").removeClass('active-scroll');
    });
    //Actual handling of the scrolling
    function startScrolling(modifier, step) {
        if (scrollHandle === 0) {
            scrollHandle = setInterval(function () {
                var newOffset = capitalChangesParent.scrollLeft() + (scrollStep * modifier);

                capitalChangesParent.scrollLeft(newOffset);
            }, 10);
        }
    }

    function stopScrolling() {
        clearInterval(scrollHandle);
        scrollHandle = 0;
    }
}());
/* end of main-corporate-actions__capital-changes scroll */




/* main-corporate-actions__dividend-history scroll */
(function () {
    var scrollHandle = 0,
        scrollStep = 2,
        dividendHistoryParent = $('.main-corporate-actions__dividend-history');
    //Start the scrolling process
    $(".main-corporate-actions__panner").on("mouseenter touchstart", function () {
        var data = $(this).data('scrollModifier'),
            direction = parseInt(data, 10);
        $(this).addClass('active-scroll');
        startScrolling(direction, scrollStep);
    });
    //Kill the scrolling
    $(".main-corporate-actions__panner").on("mouseleave", function () {
        stopScrolling();
        $(this).removeClass('active-scroll');
    });
    $(".main-corporate-actions__dividend-history").on("touchstart click mouseenter", function () {
        stopScrolling();
        $(".main-corporate-actions__panner").removeClass('active-scroll');
    });
    //Actual handling of the scrolling
    function startScrolling(modifier, step) {
        if (scrollHandle === 0) {
            scrollHandle = setInterval(function () {
                var newOffset = dividendHistoryParent.scrollLeft() + (scrollStep * modifier);

                dividendHistoryParent.scrollLeft(newOffset);
            }, 10);
        }
    }

    function stopScrolling() {
        clearInterval(scrollHandle);
        scrollHandle = 0;
    }
}());
/* end of main-corporate-actions__dividend-history scroll */

/* END OF Corporate-Actions */


/*START OF MAJOR SHAREHOLDERS TAB */ 

/* Main Major Shareholders tabs */
let mainMajorShareholderTabs = document.querySelectorAll(".main-major-shareholders__head__tabs li");
let mainMajorShareholderTabsArray = Array.from(mainMajorShareholderTabs);
let mainMajorShareholderDivs = document.querySelectorAll(".main-major-shareholders__container > div");
let mainMajorShareholderDivsArray = Array.from(mainMajorShareholderDivs);
mainMajorShareholderTabsArray.forEach((ele) => {
    ele.addEventListener("click", function (e) {
        mainMajorShareholderTabsArray.forEach((ele) => {
            ele.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        mainMajorShareholderDivsArray.forEach((div) => {
            div.style.display = "none";
        });
        document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
    });
    $('.main-major-shareholders__historical-changes-tab').click(function () {
        $('.main-major-shareholders__head__options').css('display', 'flex');
    })
    $('.main-major-shareholders__major-shareholders-tab').click(function () {
        $('.main-major-shareholders__head__options').css('display', 'none');
    })
});
/* End Of Main Major Shareholders  tabs */

/* Main Major Shareholders - shareholders scroll */
(function () {
    var scrollHandle = 0,
        scrollStep = 2,
        mainMajorShareholdersShareholderParent = $('.main-major-shareholders__container__major-shareholders__data');
    //Start the scrolling process
    $(".main-major-shareholders__container__major-shareholders__panner").on("mouseenter touchstart", function () {
        var data = $(this).data('scrollModifier'),
            direction = parseInt(data, 10);
        $(this).addClass('active-scroll');
        startScrolling(direction, scrollStep);
    });
    //Kill the scrolling
    $(".main-major-shareholders__container__major-shareholders__panner").on("mouseleave", function () {
        stopScrolling();
        $(this).removeClass('active-scroll');
    });
    $(".main-major-shareholders__container__major-shareholders__data").on("touchstart click mouseenter", function () {
        stopScrolling();
        $(".main-major-shareholders__container__major-shareholders__panner").removeClass('active-scroll');
    });
    //Actual handling of the scrolling
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
/* end of Main Major Shareholders - shareholders scroll */



/* Main Major Shareholders - historical-changes scroll */
(function () {
  var scrollHandle = 0,
      scrollStep = 2,
      mainMajorShareholdersHistoricalChangesParent = $('.main-major-shareholders__container__historical-changes__data');
  //Start the scrolling process
  $(".main-major-shareholders__container__historical-changes__panner").on("mouseenter touchstart", function () {
      var data = $(this).data('scrollModifier'),
          direction = parseInt(data, 10);
      $(this).addClass('active-scroll');
      startScrolling(direction, scrollStep);
  });
  //Kill the scrolling
  $(".main-major-shareholders__container__historical-changes__panner").on("mouseleave", function () {
      stopScrolling();
      $(this).removeClass('active-scroll');
  });
  $(".main-major-shareholders__container__historical-changes__data").on("touchstart click mouseenter", function () {
      stopScrolling();
      $(".main-major-shareholders__container__historical-changes__panner").removeClass('active-scroll');
  });
  //Actual handling of the scrolling
  function startScrolling(modifier, step) {
      if (scrollHandle === 0) {
          scrollHandle = setInterval(function () {
              var newOffset = mainMajorShareholdersHistoricalChangesParent.scrollLeft() + (scrollStep * modifier);
              mainMajorShareholdersHistoricalChangesParent.scrollLeft(newOffset);
          }, 10);
      }
  }

  function stopScrolling() {
      clearInterval(scrollHandle);
      scrollHandle = 0;
  }
}());
/* end of Main Major Shareholders - historical-changes scroll */

/* select dropdown */
const selectMajor = document.querySelectorAll('.main-major-shareholders__container__historical-changes__filter__select__btn');
const optionMajor = document.querySelectorAll('.main-major-shareholders__container__historical-changes__filter__select__dropdown__option');
let indexMajor = 1;

selectMajor.forEach(a => {
    a.addEventListener('click', b => {
        const nextMajor = b.target.nextElementSibling;
        nextMajor.classList.toggle('toggle');
        nextMajor.style.zIndex = indexMajor++;
    })
});

optionMajor.forEach(a => {
    a.addEventListener('click', b => {
        b.target.parentElement.classList.remove('toggle');

        const parentMajor = b.target.closest('.main-major-shareholders__container__historical-changes__filter__select').children[0];
        parentMajor.setAttribute('data-type', b.target.getAttribute('data-type'));
        parentMajor.innerHtml = b.target.innerText;
    })
});
/* end of select dropdown */

/* add class active to select dropdown options to be bold */
$('.main-major-shareholders__container__historical-changes__filter__select__dropdown__option').click(function () {
    $('.main-major-shareholders__container__historical-changes__filter__select__dropdown__option').removeClass('active');
    $(this).addClass('active');
});
/* end of add class active to select dropdown options to be bold */

/* hide panner when select dropdown is visible */
$('.main-major-shareholders__container__historical-changes__filter__select__btn').click(function () {
    $('.main-major-shareholders__container__historical-changes__panner').hide();
})
$('.main-major-shareholders__container__historical-changes__filter__select__dropdown__option').click(function () {
    $('.main-major-shareholders__container__historical-changes__panner').show();
})
/* end of hide panner when select dropdown is visible */

/* hide foreign ownership section when */
$('.main-major-shareholders__historical-changes-tab').click(function () {
    $('.foreign-ownership').hide();
});

$('.main-major-shareholders__major-shareholders-tab').click(function () {
    $('.foreign-ownership').show();
    $('.main-major-shareholders__container__historical-changes__filter__select__dropdown').removeClass('toggle');
});
/* end ofhide foreign ownership section when */


/*END OF MAJOR SHAREHOLDERS TAB */ 


/* ATART OF MAIN DISCLOSURES TAB */ 

/* Main Pr tabs */
let mainPrTabs = document.querySelectorAll(".pr__tabs li");
let mainPrTabsArray = Array.from(mainPrTabs);
let mainPrDivs = document.querySelectorAll(".pr__container > div");
let mainPrDivsArray = Array.from(mainPrDivs);
mainPrTabsArray.forEach((ele) => {
    ele.addEventListener("click", function (e) {
        mainPrTabsArray.forEach((ele) => {
            ele.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        mainPrDivsArray.forEach((div) => {
            div.style.display = "none";
        });
        document.querySelector(e.currentTarget.dataset.cont).style.display = "block";
    });
});
/* End Of Pr tabs */

/* main disclosures expand menu */
$('.pr__disclosures__container__row__line__icon').click(function () {

    $(this).parent('div').hide();
    $(this).parent('div').siblings().fadeIn(400)
})
$('.pr__disclosures__container__row__details__header__close').click(function(){
    $(this).parent('div').parent('div').hide();
    $(this).parent('div').parent('div').siblings().show()
})
/* end of main disclosures expand menu */

/* main press-release expand menu */
$('.pr__press-release__container__row__line__icon').click(function () {

    $(this).parent('div').hide();
    $(this).parent('div').siblings().fadeIn(400);
})
$('.pr__press-release__container__row__details__header__close').click(function(){
    $(this).parent('div').parent('div').hide();
    $(this).parent('div').parent('div').siblings().show();
})
/* end of main press-release expand menu */

/* main calendar expand menu */

/* desktop */
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
/* End of desktop */

/* mobile */
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
/* End of mobile */

/* end of main calendar expand menu */

/* Calendar popup */

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
/* End of Calendar popup */

/* END OF MAIN DISCLOSURES TAB */ 


/* START OF PROJECTS TAB */ 

/* project-monitor tabs */
$(".project-monitor__head__options__tabs li").click(function(){
  $(".project-monitor__head__options__tabs li").removeClass('active');
  $(this).addClass('active');
})
/* End Of project-monitor tabs */


/* project-monitor__riyal scroll */
(function () {
    var scrollHandle = 0,
        scrollStep = 2,
        projectMonitorRiyalParent = $('.project-monitor__riyal');
    //Start the scrolling process
    $(".project-monitor__panner").on("mouseenter touchstart", function () {
        var data = $(this).data('scrollModifier'),
            direction = parseInt(data, 10);
        $(this).addClass('active-scroll');
        startScrolling(direction, scrollStep);
    });
    //Kill the scrolling
    $(".project-monitor__panner").on("mouseleave", function () {
        stopScrolling();
        $(this).removeClass('active-scroll');
    });
    $(".project-monitor__riyal").on("touchstart click mouseenter", function () {
        stopScrolling();
        $(".project-monitor__panner").removeClass('active-scroll');
    });
    //Actual handling of the scrolling
    function startScrolling(modifier, step) {
        if (scrollHandle === 0) {
            scrollHandle = setInterval(function () {
                var newOffset = projectMonitorRiyalParent.scrollLeft() + (scrollStep * modifier);

                projectMonitorRiyalParent.scrollLeft(newOffset);
            }, 10);
        }
    }

    function stopScrolling() {
        clearInterval(scrollHandle);
        scrollHandle = 0;
    }
}());
/* end of project-monitor__riyal scroll */

/* End OF PROJECTS TAB */ 


