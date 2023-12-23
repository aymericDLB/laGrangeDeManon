function myReservation(params, params2) {
    var arrayDatesDisable = [];
    var datesResa = [];
    var dateHighlight = [];

    params2.forEach(elm => {
      var splitedDateDeb = elm.dateDebReservation.split("-");
      var yearDateDeb = splitedDateDeb[0];
      var monthDateDeb = parseInt(splitedDateDeb[1] -1).toString();
      var dayDateDeb = parseInt(splitedDateDeb[2]).toString();

      var splitedDateFin = elm.dateFinReservation.split("-");
      var yearDateFin = splitedDateFin[0];
      var monthDateFin = parseInt(splitedDateFin[1]-1).toString();
      var dayDateFin = parseInt(splitedDateFin[2]).toString();

      var dateFinal = {
        start: new Date(yearDateDeb, monthDateDeb, dayDateDeb),
        end: new Date(yearDateFin, monthDateFin, dayDateFin)
      };
      dateHighlight.push(dateFinal);
    });

    var highlight = {
      dates: dateHighlight,
      color: '#9e9e9e',
      legend: 'Réservé'
    };

    var datepicker = new Datepickk({
       container: document.querySelector('#datepicker'),
       inline: true,
       range: true,
       highlight: [highlight]
    });

    datepicker.minDate = new Date();
    datepicker.lang = 'fr';

    params.forEach(element => {
        var tmpDateToDisable = new Date(element.year,element.month,element.day);
        arrayDatesDisable.push(tmpDateToDisable);
    });

    datepicker.disabledDates = arrayDatesDisable;


    datepicker.onSelect = function(){
        datesResa.push(this.toLocaleDateString())

        if (datesResa.length < 2) {
            var dateDebFinal = datesResa[datesResa.length]
        }
        if (datesResa.length < 3) {
            var dateDebFinal = datesResa[datesResa.length-2]
            var dateFinFinal = datesResa[datesResa.length-1]
        }else{
            var dateDebFinal = datesResa[datesResa.length-3]
            var dateFinFinal = datesResa[datesResa.length-1]
        }

        if (datesResa.length-1 < datesResa.length-3) {
            console.log("Il y a une erreur dans la date")
        }

        if (dateDebFinal > dateFinFinal) {
            var tmp = dateDebFinal;
            dateDebFinal = dateFinFinal;
            dateFinFinal = tmp;
        }
        document.getElementById("dateDeb").value = dateDebFinal;
        document.getElementById("dateFin").value = dateFinFinal;
    }
}

function myPlanning(params) {

  var dateHighlightPlanning = [];
  var dateTooltipPlanning = [];
  var colorTab = ['#3943fe','#597e22','#5c0377','#05555d','#8a501b','#3f3c27','#08157a','#7a31f3','#868ff8','#e24373','#e36f74','#ea0b62','#eea228','#72422d','#9dc2b6',
  '#29f786','#8d50a7','#143801','#b05718','#504d6d','#8aff40','#cc5d87','#ac1204','#6410ca','#cdce65','#042da2','#4c4262','#f2ad01','#031d48','#31b06b','#5b61c6','#ccbf43'];

  params.forEach(elm => {
    var splitedDateDeb = elm.dateDebReservation.split("-");
    var yearDateDeb = splitedDateDeb[2].toString();
    var monthDateDeb = parseInt(splitedDateDeb[1]).toString();
    var dayDateDeb = parseInt(splitedDateDeb[0]).toString();

    var splitedDateFin = elm.dateFinReservation.split("-");
    var yearDateFin = splitedDateFin[2];
    var monthDateFin = parseInt(splitedDateFin[1]).toString();
    var dayDateFin = parseInt(splitedDateFin[0]).toString();

    const chiffreRandom = Math.floor(Math.random() * 31);
    //const randomColor = Math.floor(Math.random()*16777215).toString(16);

    var highlight = {
      start: new Date(yearDateDeb, monthDateDeb, dayDateDeb),
      end: new Date(yearDateFin, monthDateFin, dayDateFin),
      color: 'white',
      backgroundColor: colorTab[chiffreRandom],
      legend: elm.nom+' '+elm.prenom
    };

    var redirectionDeb = '<a class="redirectionDetailsReservation" routerLink="/administration/reservation/'+elm.idReservation+'/details"> Début Réservation n°'+elm.idReservation+'</a>'
    var redirectionFin = '<a class="redirectionDetailsReservation" routerLink="/administration/reservation/'+elm.idReservation+'/details"> Fin Réservation n°'+elm.idReservation+'</a>'
    var tooltipDeb = {
      date: new Date(yearDateDeb, monthDateDeb, dayDateDeb),
      text: redirectionDeb
    };

    var tooltipFin = {
      date: new Date(yearDateFin, monthDateFin, dayDateFin),
      text: redirectionFin
    };

    dateHighlightPlanning.push(highlight);
    dateTooltipPlanning.push(tooltipDeb,tooltipFin);
  });

  var datepicker = new Datepickk({
    container: document.querySelector('#datepicker'),
    inline: true,
    locked: true
  });

  datepicker.minDate = new Date();
  datepicker.lang = 'fr';
  datepicker.tooltips = dateTooltipPlanning;
  datepicker.highlight = dateHighlightPlanning;
}
