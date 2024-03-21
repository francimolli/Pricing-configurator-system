// $(function() {
//     $('input[name="datefilter"]').daterangepicker({
//         minDate: "04/01/2022",
//         maxDate: "10/02/2022",
//         autoUpdateInput: false,
//         locale: {
//             cancelLabel: 'Clear'
//         }
//     });
//     $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
//         $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
//     });
//     $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
//         $(this).val('');
//     });
// });
function innerPrice(){
    let totalPrice = checkData();
    let startDate = $('#start_date').val();
    let endDate = $('#end_date').val();
    let sDate = new Date(startDate);
    let eDate = new Date(endDate);  
    if ((sDate !== '' && eDate !== '') && !(startDate >= endDate)){
        document.getElementById('final_label').innerHTML = 'Final Price: €' + totalPrice;
    }
}

function checkData(){
    $("#check_data_label").css("display", "none");
    let startDate = $('#start_date').val();
    let endDate = $('#end_date').val();
    let sDate = new Date(startDate);
    let eDate = new Date(endDate);
    let accommodation = $('#alloggio').val();
    let firstSel = $('#piazzola').val();
    let secondSel = $('#mobilehome').val();
    let thirdSel = $('#lodges').val();
    if (startDate !== '' && endDate !== '' && accommodation !== 'none' && (firstSel !== 'none' || secondSel !== 'none' || thirdSel !== 'none') && startDate < endDate){
        let stayPrice = Estimate('alloggio');
        let totalPrice = parseFloat(stayPrice) + parseFloat(EstimateExtra(accommodation));
        $("#prezzo_alsumbitto").css("display", "");
        return totalPrice.toFixed(2);
    }else{
        $("#check_data_label").css("display", "");
        document.getElementById('final_label').innerHTML = "";
        $("#prezzo_alsumbitto").css("display", "none");
    }
}

function EstimateExtra(tipoAlloggio){
    let price = 0;
    if (tipoAlloggio === 'piazzola') {
        let people = $('#people_select').val();
        people = Number(people);
        let child = $('#extra_child_select').val();
        child = Number(child);
        let minichild = $('#extra_minichild_select').val();
        minichild = Number(minichild);
        let veichle = $('#veichle').is(":checked");
        if(veichle){
            price = price + parseFloat(Estimate('veichle'));
        }
        let dog = $('#dog').is(":checked");
        if(dog){
            price = price + parseFloat(Estimate('dog'));
        }
        let gommone = $('#gommone').is(":checked");
        if(gommone){
            price = price + parseFloat(Estimate('gommone'));
        }
        let barcaboa = $('#barca-boa').is(":checked");
        if(barcaboa){
            price = price + parseFloat(Estimate('barca_boa'));
        }
        price = price + parseFloat((people * Estimate('person')) + (child * Estimate('child')) + (minichild * Estimate('minichild')));
        return price.toFixed(2);
    } else if (tipoAlloggio === 'mobilehome'){
        let people = $('#people_mh_select').val();
        people = Number(people);
        price = price + parseFloat(people * Estimate('person_lodges'));
        let veichle = $('#veichle_mh').is(":checked");
        if(veichle){
            price = price + parseFloat(Estimate('veichle'));
        }
        let gommone = $('#gommone_mh').is(":checked");
        if(gommone){
            price = price + parseFloat(Estimate('gommone'));
        }
        let barcaboa = $('#barca-boa_mh').is(":checked");
        if(barcaboa){
            price = price + parseFloat(Estimate('barca_boa'));
        }
        return price;
    
    } else if (tipoAlloggio === 'lodges'){
        let people = $('#people_lodges_select').val();
        people = Number(people);
        price = price + parseFloat(people * Estimate('person_lodges'));
        let veichle = $('#veichle_lodges').is(":checked");
        if(veichle){
            price = price + parseFloat(Estimate('veichle'));
        }
        let gommone = $('#gommone_lodges').is(":checked");
        if(gommone){
            price = price + parseFloat(Estimate('gommone'));
        }
        let barcaboa = $('#barca-boa_lodges').is(":checked");
        if(barcaboa){
            price = price + parseFloat(Estimate('barca_boa'));
        }
        return price;
    } else {
        return 0;
    }
}

function Estimate(which_){
    let periodes = ["bassa1", "media1", "alta1", "altiss", "alta2", "media2", "bassa2"];
    let case_ = '';
    if( which_ == 'alloggio'){
        case_ = $('#alloggio').val();
    } else {
        case_ = which_;
    }
    let startDate = $('#start_date').val();
    let endDate = $('#end_date').val();
    let sDate = new Date(startDate);
    let eDate = new Date(endDate);
    if( sDate >= eDate){
        $('#check_data_label').css("display", "");
        document.getElementById('final_label').innerHTML = "";
    }else{
        $('#check_data_label').css("display", "none");
        let sInterval = whichInterval(sDate);
        let eInterval = whichInterval(eDate);
        let totMilli = Math.abs(eDate - sDate);
        const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
        let okayInit = false;
        let price = 0;
        let lengthPeriodes = periodes.length;
        switch (case_) {
            case 'piazzola':
                let subTypePiazzola = $('#piazzola_selection').val();
                switch (subTypePiazzola) {
                    case 'standard':
                        let priceDictStandard = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictStandard, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'silver':
                        let priceDictSilver = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictSilver, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'lake-view':
                        let priceDictLakeView = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictLakeView, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'lake-view-xl':
                        let priceDictLakeViewXL = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictLakeViewXL, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'small':
                        let priceDictSmall = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictSmall, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

                }
            case 'mobilehome':
                let subTypeMobileHome = $('#mb_selection').val();
                switch(subTypeMobileHome){
                    case 'mobilehome-classic':
                        let priceDictClassic = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictClassic, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'mobilehome-river':
                        let priceDictRiver = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2": 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictRiver, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'mobilehome-comfort':
                        let priceDictComfort = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictComfort, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'mobilehome-superior':
                        let priceDictSuperior = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictSuperior, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                }
            case 'lodges':
                let subTypeLodges = $('#lodges_selection').val();
                switch (subTypeLodges){
                    case 'safari':
                        let priceDictSafari = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictSafari, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'air-lake-view':
                        let priceDictAirLakeView = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictAirLakeView, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'air-river':
                        let priceDictAirRiver = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictAirRiver, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'mini-lake-view':
                        let priceDictMiniLakeView = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictMiniLakeView, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                    case 'mini-river':
                        let priceDictMiniRiver = {
                            "b1" : 8,
                            "b2" : 8,
                            "b7" : 8,
                            "m1" : 8,
                            "m2" : 8,
                            "m7" : 8,
                            "a" : 8,
                            "aa" : 8
                        };
                        return CalculatePeriod(totDays, sInterval, eInterval, priceDictMiniRiver, true, lengthPeriodes, okayInit, periodes, sDate, eDate);

                }
            case 'person':
                let priceDictPerson = {
                    "b1" : 8,
                    "b2" : 8,
                    "b7" : 8,
                    "m1" : 8,
                    "m7" : 8,
                    "a" : 8,
                    "aa" : 8
                };
                return CalculatePeriod(totDays, sInterval, eInterval, priceDictPerson, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

            case 'child':
                let priceDictChild = {
                    "b1" : 8,
                    "b2" : 8,
                    "b7" : 8,
                    "m1" : 8,
                    "m7" : 8,
                    "a" : 8,
                    "aa" : 8
                };
                return CalculatePeriod(totDays, sInterval, eInterval, priceDictChild, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

            case 'minichild':
                let priceDictMiniChild = {
                    "b1" : 8,
                    "b2" : 8,
                    "b7" : 8,
                    "m1" : 8,
                    "m7" : 8,
                    "a" : 8,
                    "aa" : 8
                };
                return CalculatePeriod(totDays, sInterval, eInterval, priceDictMiniChild, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

            case 'veichle':
                let priceDictVeichle = {
                    "b1" : 8,
                    "b2" : 8,
                    "b7" : 8,
                    "m1" : 8,
                    "m7" : 8,
                    "a" : 8,
                    "aa" : 8
                };
                return CalculatePeriod(totDays, sInterval, eInterval, priceDictVeichle, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

            case 'dog':
                let priceDictDog = {
                    "b1" : 8,
                    "b2" : 8,
                    "b7" : 8,
                    "m1" : 8,
                    "m7" : 8,
                    "a" : 8,
                    "aa" : 8
                };
                return CalculatePeriod(totDays, sInterval, eInterval, priceDictDog, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

            case 'gommone':
                let priceDictGommone = {
                    "b1" : 8,
                    "b2" : 8,
                    "b7" : 8,
                    "m1" : 8,
                    "m7" : 8,
                    "a" : 8,
                    "aa" : 8
                };
                return CalculatePeriod(totDays, sInterval, eInterval, priceDictGommone, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

            case 'barca_boa':
                let priceDictBarca = {
                    "b1" : 8,
                    "b2" : 8,
                    "b7" : 8,
                    "m1" : 8,
                    "m7" : 8,
                    "a" : 8,
                    "aa" : 8
                };
                return CalculatePeriod(totDays, sInterval, eInterval, priceDictBarca, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

            case 'person_lodges':
                let priceDictPersonLodges = {
                    "b1" : 8,
                    "b2" : 8,
                    "b7" : 8,
                    "m1" : 8,
                    "m2" : 8,
                    "m7" : 8,
                    "a" : 8,
                    "aa" : 8
                };
                return CalculatePeriod(totDays, sInterval, eInterval, priceDictPersonLodges, false, lengthPeriodes, okayInit, periodes, sDate, eDate);

        }
    }
}
function CalculatePeriod(totDays, sInterval, eInterval, priceDict, booleano, lengthPeriodes, okayInit, periodes, sDate, eDate){
    if(sInterval === eInterval){
        let price = totDays * getPeriod(totDays, sInterval, priceDict, false);
        return price.toFixed(2);
    }
    //core
    for (let i = 0; i < lengthPeriodes; i++){
        if (eInterval != periodes[i] && okayInit){
            let entirePeriodo = gotoEndofPeriod(translateMonth(periodes[i])) + 1;
            console.log('giorni mezz ' + entirePeriodo);
            price = price + (entirePeriodo * getPeriod(totDays, periodes[i], priceDict, booleano));
        }
        if (sInterval === periodes[i]){
            let giorniPeriodoIniz = gotoEndofPeriod(sDate);
            okayInit = true;
            giorniPeriodoIniz = giorniPeriodoIniz + 1;
            console.log('giorni iniz ' + giorniPeriodoIniz);
            price = giorniPeriodoIniz * getPeriod(totDays, sInterval, priceDict, booleano);
        }
        if (eInterval == periodes[i]){
            let finalPeriodo = gofromStartofPeriod(eDate);
            console.log('giorni fin ' + finalPeriodo);
            price = price + (finalPeriodo * getPeriod(totDays, eInterval, priceDict, booleano));
            return price.toFixed(2);
        }
    }
}
function translateMonth(mese){
    let sBassa1 = new Date("2022-04-01");
    let eBassa1 = new Date("2022-05-20");
    let sBassa2 = new Date("2022-09-10");
    let eBassa2 = new Date("2022-10-02");
    let sMedia1 = new Date("2022-05-21");
    let eMedia1 = new Date("2022-07-01");
    let sMedia2 = new Date("2022-09-03");
    let eMedia2 = new Date("2022-09-09");
    let sAlta1 = new Date("2022-07-02");
    let eAlta1 = new Date("2022-07-15");
    let sAlta2 = new Date("2022-08-27");
    let eAlta2 = new Date("2022-09-02");
    let sAltiss = new Date("2022-07-16");
    let eAltiss = new Date("2022-08-26");
    if(mese === "bassa1"){
        return sBassa1;
    }
    if(mese === "media1"){
        return sMedia1;
    }
    if(mese === "alta1"){
        return sAlta1;
    }
    if(mese === "altiss"){
        return sAltiss;
    }
    if(mese === "alta2"){
        return sAlta2;
    }
    if(mese === "media2"){
        return sMedia2;
    }
    if(mese === "bassa2"){
        return sBassa2;
    }
}
function gofromStartofPeriod(xDate){
    let sBassa1 = new Date("2022-04-01");
    let eBassa1 = new Date("2022-05-20");
    let sBassa2 = new Date("2022-09-10");
    let eBassa2 = new Date("2022-10-02");
    let sMedia1 = new Date("2022-05-21");
    let eMedia1 = new Date("2022-07-01");
    let sMedia2 = new Date("2022-09-03");
    let eMedia2 = new Date("2022-09-09");
    let sAlta1 = new Date("2022-07-02");
    let eAlta1 = new Date("2022-07-15");
    let sAlta2 = new Date("2022-08-27");
    let eAlta2 = new Date("2022-09-02");
    let sAltiss = new Date("2022-07-16");
    let eAltiss = new Date("2022-08-26");
    if(xDate < sAltiss){
        if(xDate < sAlta1){
            if(xDate > eBassa1){
                let totMilli = Math.abs(xDate - sMedia1);
                const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
                return totDays;
            }
            let totMilli = Math.abs(xDate - sBassa1);
            const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
            return totDays;
        }
        let totMilli = Math.abs(xDate - sAlta1);
        const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
        return totDays;
    }else if (xDate > eAltiss){
        if (xDate > eAlta2){
            if(xDate > eMedia2){
                let totMilli = Math.abs(xDate - sBassa2);
                const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
                return totDays;
            }
            let totMilli = Math.abs(xDate - sMedia2);
            const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
            return totDays;
        }
        let totMilli = Math.abs(xDate - sAlta2);
        const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
        return totDays;
    }
    let totMilli = Math.abs(xDate - sAltiss);
    const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
    return totDays;
}
function gotoEndofPeriod(xDate){
    let sBassa1 = new Date("2022-04-01");
    let eBassa1 = new Date("2022-05-20");
    let sBassa2 = new Date("2022-09-10");
    let eBassa2 = new Date("2022-10-02");
    let sMedia1 = new Date("2022-05-21");
    let eMedia1 = new Date("2022-07-01");
    let sMedia2 = new Date("2022-09-03");
    let eMedia2 = new Date("2022-09-09");
    let sAlta1 = new Date("2022-07-02");
    let eAlta1 = new Date("2022-07-15");
    let sAlta2 = new Date("2022-08-27");
    let eAlta2 = new Date("2022-09-02");
    let sAltiss = new Date("2022-07-16");
    let eAltiss = new Date("2022-08-26");
    if(xDate < sAltiss){
        if(xDate < sAlta1){
            if(xDate > eBassa1){
                let totMilli = Math.abs(eMedia1 - xDate);
                const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
                return totDays;
            }
            let totMilli = Math.abs(eBassa1 - xDate);
            const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
            return totDays;
        }
        let totMilli = Math.abs(eAlta1 - xDate);
        const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
        return totDays;
    }else if (xDate > eAltiss){
        if (xDate > eAlta2){
            if(xDate > eMedia2){
                let totMilli = Math.abs(eBassa2 - xDate);
                const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
                return totDays;
            }
            let totMilli = Math.abs(eMedia2 - xDate);
            const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
            return totDays;
        }
        let totMilli = Math.abs(eAlta2 - xDate);
        const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
        return totDays;
    }
    let totMilli = Math.abs(eAltiss - xDate);
    const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
    return totDays;
}

function getPeriod(days, period, dict, mhlodges){
    if(period === "bassa1" || period === "bassa2"){
        if(days >= 7){
            return dict["b7"];
        }else if (days >= 2){
            return dict["b2"];
        }
        return dict["b1"];
    }else if (period === "media1" || period === "media2"){
        if(days >= 7){
            return dict["m7"];
        }else if (days >= 2 && mhlodges){
            return dict["m2"];
        }
        return dict["m1"];
    }else if (period === "alta1" || period === "alta2"){
        return dict["a"];
    }
    return dict["aa"];
}
function whichInterval(xDate){
    let sBassa1 = new Date("2022-04-01");
    let eBassa1 = new Date("2022-05-20");
    let sBassa2 = new Date("2022-09-10");
    let eBassa2 = new Date("2022-10-02");
    let sMedia1 = new Date("2022-05-21");
    let eMedia1 = new Date("2022-07-01");
    let sMedia2 = new Date("2022-09-03");
    let eMedia2 = new Date("2022-09-09");
    let sAlta1 = new Date("2022-07-02");
    let eAlta1 = new Date("2022-07-15");
    let sAlta2 = new Date("2022-08-27");
    let eAlta2 = new Date("2022-09-02");
    let sAltiss = new Date("2022-07-16");
    let eAltiss = new Date("2022-08-26");
    if(xDate < sAltiss){
        if(xDate < sAlta1){
            if(xDate > eBassa1){
                return "media1";
            }
            return "bassa1";
        }
        return "alta1";
    }else if (xDate > eAltiss){
        if (xDate > eAlta2){
            if(xDate > eMedia2){
                return "bassa2";
            }
            return "media2";
        }
        return "alta2";
    }
    return "altiss";
}
function showNhide(){
    let selected = $('#alloggio').val();
    if (selected ==='none'){
        $("#lodges").css("display", "none");
        $("#mobilehome").css("display", "none");
        $("#piazzola").css("display", "none");
        $("#people").css("display", "none");
        $("#people_mh").css("display", "none");
        $("#people_lodges").css("display", "none");
        $("#extra_child").css("display", "none");
        $("#extra_minichild").css("display", "none");
        $("#extra_piazzole").css("display", "none");
        $("#submitto_row").css("display", "none");
        $("#prezzo_alsubmitto").css("display", "none");
        $("#btnPrint").css("display", "none");
        $("#extra_mh").css("display", "none");    
        $("#extra_lodges").css("display", "none");                
    }
    if (selected === 'piazzola'){
        $("#lodges").css("display", "none");
        $("#mobilehome").css("display", "none");
        $("#piazzola").css("display", "");
        $("#form_extra").css("display", "");
        $("#extra_mh").css("display", "none");    
        $("#extra_lodges").css("display", "none");  
        let selectedSubType = $('#piazzola_selection').val();
        if (selectedSubType === 'none'){
            $("#people").css("display", "none");
            $("#people_mh").css("display", "none");
            $("#people_lodges").css("display", "none");
            $("#extra_child").css("display", "none");
            $("#extra_minichild").css("display", "none");
            $("#extra_piazzole").css("display", "none");
            $("#submitto_row").css("display", "none");
            $("#prezzo_alsubmitto").css("display", "none");
            $("#btnPrint").css("display", "none");
        } else {
            $("#people").css("display", "");
            $("#extra_child").css("display", "");
            $("#extra_minichild").css("display", "");
            $("#extra_piazzole").css("display", "");
            $("#submitto_row").css("display", "")
            $("#prezzo_alsubmitto").css("display", "");
            $("#btnPrint").css("display", "");
        }
    }
    if (selected === 'mobilehome'){
        $("#piazzola").css("display", "none");
        $("#lodges").css("display", "none");
        $("#mobilehome").css("display", "");
        $("#people").css("display", "none");
        $("#extra_child").css("display", "none");
        $("#extra_minichild").css("display", "none");
        $("#form_extra").css("display", "");
        $("#extra_piazzole").css("display", "none");
        $("#prezzo_alsubmitto").css("display", "none");
        $("#extra_mh").css("display", "none");    
        $("#extra_lodges").css("display", "none");                
        let selectedSubType = $('#mb_selection').val();
        if (selectedSubType === 'none'){
            $("#people").css("display", "none");
            $("#people_mh").css("display", "none");
            $("#people_lodges").css("display", "none");
            $("#extra_child").css("display", "none");
            $("#extra_minichild").css("display", "none");
            $("#submitto_row").css("display", "none");
            $("#prezzo_alsubmitto").css("display", "none");
            $("#btnPrint").css("display", "");
            $("#extra_mh").css("display", "none");
        } else {
            $("#extra_mh").css("display", "");
            $("#people_mh").css("display", "");
            $("#submitto_row").css("display", "")
            $("#prezzo_alsubmitto").css("display", "");
            $("#btnPrint").css("display", "");
        }
    }
    if(selected === 'lodges'){
        $("#piazzola").css("display", "none");
        $("#mobilehome").css("display", "none");
        $("#lodges").css("display", "");
        $("#people").css("display", "none");
        $("#extra_child").css("display", "none");
        $("#extra_minichild").css("display", "none");
        $("#form_extra").css("display", "");
        $("#extra_piazzole").css("display", "none");
        $("#extra_mh").css("display", "none");    
        $("#extra_lodges").css("display", "none"); 
        let selectedSubType = $('#lodges_selection').val();
        if (selectedSubType === 'none'){
            $("#people").css("display", "none");
            $("#people_mh").css("display", "none");
            $("#people_lodges").css("display", "none");
            $("#extra_child").css("display", "none");
            $("#extra_minichild").css("display", "none");
            $("#submitto_row").css("display", "none");
            $("#prezzo_alsubmitto").css("display", "none");
            $("#btnPrint").css("display", "");
            $("#extra_lodges").css("display", "none");
        } else {
            $("#extra_lodges").css("display", "");
            $("#people_lodges").css("display", "");
            $("#submitto_row").css("display", "")
            $("#prezzo_alsubmitto").css("display", "");
            $("#btnPrint").css("display", "");
        }
    }
}

function convertDate(myDate){
    var dd = String(myDate.getDate()).padStart(2, '0');
    var mm = String(myDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = myDate.getFullYear();
    return(dd + '/' + mm + '/' + yyyy);
}

function getTodaysDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return(dd + '-' + mm + '-' + yyyy);
}

$("#btnPrint").on("click", function () {
    let startDate = $('#start_date').val();
    let endDate = $('#end_date').val();
    let sDate = new Date(startDate);
    let eDate = new Date(endDate);
    if( sDate < eDate){
        $('#check_data_label').css("display", "none");
        let totMilli = Math.abs(eDate - sDate);
        const totDays = Math.ceil(totMilli / (1000 * 60 * 60 * 24));
        sDate = convertDate(sDate);
        eDate = convertDate(eDate);
        let alloggio = $('#alloggio').val();
        let priceExtra = String(parseFloat(EstimateExtra(alloggio)).toFixed(2));
        let priceAlloggio = String (parseFloat(Estimate('alloggio')).toFixed(2));
        let priceTotale = checkData();
        var today = getTodaysDate();
        if (alloggio === 'none' || startDate === '' || endDate === ''){
            $("#check_data_label").css("display", "");
            document.getElementById('final_label').innerHTML = "";
        } else if ( alloggio === 'piazzola' ){
            let subTypePiazzola =  $("#piazzola_selection option:selected").text();
            let people = $('#people_select').val();
            people = Number(people);
            people = String(people + ' - €' + parseFloat((people * Estimate('person'))).toFixed(2));
            let child = $('#extra_child_select').val();
            child = Number(child);
            child = String(child + ' - €' + parseFloat((child * Estimate('child'))).toFixed(2));
            let minichild = $('#extra_minichild_select').val();
            minichild = Number(minichild);
            minichild = String(minichild + ' - €' + parseFloat((minichild * Estimate('minichild'))).toFixed(2));
            let veichle = $('#veichle').is(":checked");
            if (veichle === true){
                veichle = String('sì - €' + parseFloat(Estimate('veichle')).toFixed(2));
            } else {
                veichle = 'no';
            }
            let dog = $('#dog').is(":checked");
            if (dog === true){
                dog = String('sì - €' + parseFloat(Estimate('dog')).toFixed(2));
            } else {
                dog = 'no';
            }
            let gommone = $('#gommone').is(":checked");
            if (gommone === true){
                gommone = String('sì - €' + parseFloat(Estimate('gommone')).toFixed(2));
            } else {
                gommone = 'no';
            }
            let barcaboa = $('#barca-boa').is(":checked");
            if (barcaboa === true){
                barcaboa = String('sì - €' + parseFloat(Estimate('barca_boa')).toFixed(2));
            } else {
                barcaboa = 'no';
            }
            // <thead><tr><th><h2 style="text-align:left;">Oggetto</h2></th><th><h2 style="text-align:left;">Selezione</h2></th></tr></thead>
                var printWindow = window.open('', '_self', 'height=0,width=0');
                printWindow.document.write('<head><title>Preventivo-' + today + '</title><div style="background: #fff !important;padding-top:3%;text-align:left;"><img src="logo.png" style="text-align: left; max-width:100px" alt=""></div></head>');
                printWindow.document.write('<body style="color:#8DA27B; font-family: sans-serif;font-weight: 8;border-radius: 8px;"><div style="	width:100%; border-color:#8DA27B; position: absolute;top: 8%;left: 8%;transform: translate(-50%, -50%);"><table style="text-align:left; border-collapse: collapse;width:100%;"><tbody><tr><td><h2 style="text-align:left;">Preventivo del:</h2></td><td><h2 style="text-align:right;"><em>' + today +'</em></h2></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="padding-top:3%; text-align:left;">Data da:</h3></td>  <td><em><h3 style="text-align:right;">' + sDate + '</h3></em></td></tr>  <tr  style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">Data a:</h3></td><td><em><h3 style="text-align:right;">' + eDate + '</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">Tipologia Piazzola:</h3></td><td><em><h3 style="text-align:right;">' + subTypePiazzola +'</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;"> Numero persone extra:</h3></td><td><em><h3 style="text-align:right;">' + people + '</h3></em></td></tr>');
                printWindow.document.write('<tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">Numero bambini extra (6-11 anni):</h3></td><td><em><h3 style="text-align:right;">' + child +'</h3></em></td><tr><td><h3 style="text-align:left;"> Numero bambini extra (2-5 anni):</h3></td><td><em><h3 style="text-align:right;">' + minichild + '</h3></em></td></tr>');
                printWindow.document.write('<tr><td><h2 style="text-align:left; padding-top:10%;">Extra selezionati:</h2></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;"> Auto - Moto - Tenda  </h3></td><td><em><h3 style="text-align:right;">' + veichle + '</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">Cane</h3><em></td><td><h3 style="text-align:right;"><em>' + dog + '</em></h3></td></tr>');
                printWindow.document.write('<tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;"> Gommone in Piazzola </h3></td><td> <em><h3 style="text-align:right;">' + gommone + '</h3></em></td><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td> <h3 style="text-align:left; padding-bottom: 8%;">Barca e Boa  </h3><em></td><td><em><h3 style="text-align:right;">' + barcaboa + '</h3></em></td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left; "> Prezzo degli extra:</h3></td><td><em><h3 style="text-align:right; ">€' + priceExtra + '</h3></em> </td></tr></div>');
                printWindow.document.write('<tr><td><h3 style="text-align:left; "> Prezzo alloggio:</h3></td><td><em><h3 style="text-align:right; ">€' + priceAlloggio + '</h3></em> </td></tr></div>');
                printWindow.document.write('<tr><td><h3 style="text-align:left; "> Totale notti:</h3></td><td><em><h3 style="text-align:right; ">' + totDays + '</h3></em> </td></tr></div>');
                printWindow.document.write('<tr><td><h3 style="text-align:left; "> Prezzo medio alloggio (compresi extra) a notte:</h3></td><td><em><h3 style="text-align:right; ">€' + (priceTotale/totDays).toFixed(2) + '</h3></em> </td></tr></div>');
                printWindow.document.write('<tr><td><h2 style="text-align:left; "> Prezzo complessivo:</h2></td><td><em><h2 style="text-align:right; ">€' + priceTotale + '</h2></em> </td></tr></tbody></table></div></body>');
                printWindow.document.close();
                printWindow.print();
            } else if ( alloggio ==='mobilehome' ) {
                let subTypeMobileHome = $("#mb_selection option:selected").text();
                let people = $('#people_mh_select').val();
                people = Number(people);
                people = String(people + ' - €' + parseFloat((people * Estimate('person_lodges'))).toFixed(2));
                let veichle = $('#veichle_mh').is(":checked");
                if (veichle === true){
                    veichle = String('sì - €' + parseFloat(Estimate('veichle')).toFixed(2));
                } else {
                    veichle = 'no';
                }
                let gommone = $('#gommone_mh').is(":checked");
                if (gommone === true){
                    gommone = String('sì - €' + parseFloat(Estimate('gommone')).toFixed(2));
                } else {
                    gommone = 'no';
                }
                let barcaboa = $('#barca-boa_mh').is(":checked");
                if (barcaboa === true){
                    barcaboa = String('sì - €' + parseFloat(Estimate('barca_boa')).toFixed(2));
                } else {
                    barcaboa = 'no';
                }
                var printWindow = window.open('', '_self', 'height=0,width=0');
                printWindow.document.write('<head><title>Quote - ' + today + '</title><div style="background: #fff !important;padding-top:3%;text-align:center;"><img src="logo.png" style="text-align: left; max-width:200px" alt=""></div></head>');
                printWindow.document.write('<body style="color:#8DA27B; font-family: sans-serif;font-weight: 8;border-radius: 8px;"><div style="width:100%; border-color:#8DA27B; position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><table style="text-align:left; border-collapse: collapse;width:100%;"><tbody><tr><td><h2 style="text-align:left;">Quote from:</h2></td><td><h2 style="text-align:right;"><em>' + today +'</em></h2></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="padding-top:3%; text-align:left;">Start date:</h3></td><td><em><h3 style="text-align:right;">' + sDate + '</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">End date:</h3></td><td><em><h3 style="text-align:right;">' + eDate + '</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">Mobile Home Type:</h3></td><td><em><h3 style="text-align:right;">' + subTypeMobileHome +'</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">Number of extra people:</h3></td><td><em><h3 style="text-align:right;">' + people + '</h3></em></td></tr>');
                printWindow.document.write('<tr><td><h2 style="text-align:left; padding-top:10%;">Selected extras:</h2></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;"> Car - Motorbike - Tent </h3></td><td><em><h3 style="text-align:right;">' + vehicle + '</h3></em></td></tr>');
                
                printWindow.document.write('<tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;"> Dinghy in Pitch </h3></td><td> <em><h3 style="text-align:right;">' + gommone + '</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td> <h3 style="text-align:left; padding-bottom: 8%;">Boat and Buoy </h3></td><td><em><h3 style="text-align:right;">' + barcaboa + '</h3></em></td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;"> Price of extras:</h3></td><td><em><h3 style="text-align:right;">€' + priceExtra + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;"> Accommodation price:</h3></td><td><em><h3 style="text-align:right;">€' + priceAlloggio + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;"> Total nights:</h3></td><td><em><h3 style="text-align:right;">' + totDays + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;"> Average accommodation price (including extras) per night:</h3></td><td><em><h3 style="text-align:right;">€' + (priceTotale / totDays).toFixed(2) + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h2 style="text-align:left;"> Total Price:</h2></td><td><em><h2 style="text-align:right;">€' + priceTotale + '</h2></em> </td></tr></tbody></table></div></body>');
                printWindow.document.close();
                printWindow.print();
            } else if ( alloggio === 'lodges'){
                let subTypeLodges = $("#lodges_selection option:selected").text();
                let people = $('#people_lodges_select').val();
                people = Number(people);
                people = String(people + ' - €' + parseFloat((people * Estimate('person_lodges'))).toFixed(2));
                let veichle = $('#veichle_lodges').is(":checked");
                if (veichle === true){
                    veichle = String('sì - €' + parseFloat(Estimate('veichle')).toFixed(2));
                } else {
                    veichle = 'no';
                }
                let gommone = $('#gommone_lodges').is(":checked");
                if (gommone === true){
                    gommone = String('sì - €' + parseFloat(Estimate('gommone')).toFixed(2));
                } else {
                    gommone = 'no';
                }
                let barcaboa = $('#barca-boa_lodges').is(":checked");
                if (barcaboa === true){
                    barcaboa = String('sì - €' + parseFloat(Estimate('barca_boa')).toFixed(2));
                } else {
                    barcaboa = 'no';
                }
                var printWindow = window.open('', '_self', 'height=0,width=0');
                printWindow.document.write('<head><title>Quote - ' + today + '</title><div style="background: #fff !important;padding-top:3%;text-align:center;"><img src="logo.png" style="text-align: left; max-width:200px" alt=""></div></head>');
                printWindow.document.write('<body style="color:#8DA27B; font-family: sans-serif;font-weight: 100;border-radius: 25px;"><div style="width:100%; border-color:#8DA27B; position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><table style="text-align:left; border-collapse: collapse;width:100%;"><tbody><tr><td><h2 style="text-align:left;">Quote from:</h2></td><td><h2 style="text-align:right;"><em>' + today +'</em></h2></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="padding-top:3%; text-align:left;">Start date:</h3></td><td><em><h3 style="text-align:right;">' + sDate + '</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">End date:</h3></td><td><em><h3 style="text-align:right;">' + eDate + '</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;">Glamping Lodges Type:</h3></td><td><em><h3 style="text-align:right;">' + subTypeLodges +'</h3></em></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;"> Number of extra people:</h3></td><td><em><h3 style="text-align:right;">' + people + '</h3></em></td></tr>');
                printWindow.document.write('<tr><td><h2 style="text-align:left; padding-top:10%;">Selected extras:</h2></td></tr><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;"> Car - Motorbike - Tent  </h3></td><td><em><h3 style="text-align:right;">' + vehicle + '</h3></em></td></tr>');
                printWindow.document.write('<tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left;"> Dinghy in Pitch </h3></td><td><em><h3 style="text-align:right;">' + gommone + '</h3></em></td><tr style="border-bottom:1px solid rgba(0, 0, 0, 0.1);"><td><h3 style="text-align:left; padding-bottom: 8%;">Boat and Buoy  </h3><em></td><td><em><h3 style="text-align:right;">' + barcaboa + '</h3></em></td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;"> Price of extras:</h3></td><td><em><h3 style="text-align:right;">€' + priceExtra + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;"> Accommodation price:</h3></td><td><em><h3 style="text-align:right;">€' + priceAlloggio + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;"> Total nights:</h3></td><td><em><h3 style="text-align:right;">' + totDays + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;"> Average accommodation price (including extras) per night:</h3></td><td><em><h3 style="text-align:right;">€' + (priceTotale / totDays).toFixed(2) + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h3 style="text-align:left;">Average accommodation price (including extras) per night:</h3></td><td><em><h3 style="text-align:right;">€' + (priceTotale / totDays).toFixed(2) + '</h3></em> </td></tr>');
                printWindow.document.write('<tr><td><h2 style="text-align:left;">Total Price:</h2></td><td><em><h2 style="text-align:right;">€' + priceTotale + '</h2></em> </td></tr></tbody></table></div></body>');
                printWindow.document.close();
                printWindow.print();
            }
        
    }else {
        $('#check_data_label').css("display", "");
    }
});