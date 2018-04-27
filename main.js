import "./main.scss";

(function() {
  "use strict";

  $(document).ready(function() {
    //init values to date fields (date eual to "now")
    var now = moment();
    var theYear = now.format("YYYY");
    var theMonth = now.format("M");
    var theDay = now.format("D");

    $(".arrive__year").val(theYear);
    $(".arrive__year").attr('min', theYear);
    $(".arrive__month").val(theMonth);
    $(".arrive__day").val(theDay);
    $(".arrive__day").attr('max', moment(now).daysInMonth());
    $(".arrive__wday").val(moment().day(5).format("dddd"));


    $(".depart__year").val(theYear);
    $(".depart__year").attr('min', theYear);
    $(".depart__month").val(theMonth);
    $(".depart__day").val(theDay);
    $(".depart__day").attr('max', moment(now).daysInMonth());
    $(".depart__wday").val(moment().day(5).format("dddd"));


    var arriveValuesTag = $(".arrive input");
    var arriveDaySelector     = $(".arrive__day");
    var departValuesTag = $(".depart input");
    var departDaySelector     = $(".depart__day")
    var arrivalInput    = getDateInputHtmlFields(arriveValuesTag,arriveDaySelector);
    var departureInput  = getDateInputHtmlFields(departValuesTag,departDaySelector);

    function getDateInputHtmlFields(domContainer, daySelector) {
      var dateValue = [];
      domContainer.each ( function(index) {
          if (index < 3) {
            var inputVal = parseInt($(this).val())
            if (index === 1) {
              //set month to be correct:
              inputVal -= 1;
              daySelector.attr('max', moment(dateValue).daysInMonth());
            }
            //if days read
            if (index === 2) {
              //and day is invalid by for examle by changing the month
              if (!moment([dateValue[0], dateValue[1], inputVal]).daysInMonth()) {
                //set day to the last day in month
                inputVal = moment(dateValue).daysInMonth();
                //and set it in html
                daySelector.val(inputVal);
              }
            }
            dateValue.push(inputVal);
          }
        });
      return moment(dateValue);
    }


    arriveValuesTag.change(function() {
      arrivalInput = getDateInputHtmlFields( arriveValuesTag, arriveDaySelector );
    });

    $(".depart input").change(function() {
      departureInput = getDateInputHtmlFields(departValuesTag, departDaySelector);
    });

    var roomPrices = [8000, 12000, 14000, 16000];

    function getRoomPrice() {
      var roomPrice = 0;
      $('.room input').each(function(index) {
        var room_factor = this.checked ? 1 : 0;
        roomPrice += roomPrices[index] * room_factor;
      });
      return roomPrice;
      // return 10;
    };

    var foodPrices = [500, 1900, 2900];

    function getFoodPrice() {
      var foodPrice = 0;
      $('.food input').each(function(index) {
        var food_factor = this.checked ? 1 : 0;
        foodPrice += foodPrices[index] * food_factor;
      });
      return foodPrice;
    };

    var servicesPrices = [400, 400, 800, ];

    function getServices() {
      var servicesPrice = 0;
      $('.services input').each(function(index) {
        var services_factor = this.checked ? 1 : 0;
        servicesPrice += servicesPrices[index] * services_factor;
      });
      return servicesPrice;
    }

    function getGuestNumber() {
      return parseInt($("#guestChoise option").filter(":selected").text());
    }

    function calculateTotal() {
      var days = moment(departureInput).diff(moment(arrivalInput), 'days');
      if (days < 0) {
        $(".error").html("Hiba: A megadott távozási dátum korábbi az érkezési dátumnál. Kérem javítsa ki.");
        return;
      } else {
        $(".error").html("");
      }
      var room = parseInt(getRoomPrice());
      var food = parseInt(getFoodPrice());
      var services = parseInt(getServices());
      var guestCount = parseInt(getGuestNumber());

      var result = days*guestCount*(room+food+services);
      $(".payment").text(result);
    };
    window.calculateTotal = calculateTotal;

  }());

}());
