const api_user = "SRMG_IR_SERVICES"; //Argaam API User
const api_password = "ZWQ0YTNj1YTll/NjI0M2JhNm7Y5ND5x9urTg3NW/RlO4TcyY2JlMGE=="; // Argaam API Password

const baseUrl = "https://data.argaam.com";
const api_version = "1.0";
const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});
const largeFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
});
const toRealNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

var srmgApp = new Vue({
    el: "#SRMG-APP",
    data: {
        Config: appConfig,
        Language: "en",
        Loading: {},
        _token: "",
        MonthNames: [
            "يناير",
            "فبراير",
            "مارس",
            "أبريل ",
            "مايو",
            "يونيو ",
            "يوليو ",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
        ],
        MonthNameEn: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ],
        accessTokenExpireIn: new Date(2020),
        companyId: 13515, //this will be set by accesstoken
        marketId: 3,
        PageLoading: false,
        CurrentPageName: "overview",
        chartData: [],
        MarketValue: 0.0,
        ChartHoverPoint: {
            Date: "",
            CloseValue: 0.0,
            Volume: 0,
        },
        ChartRang: {
            Change: 0.0,
            ChangePercentage: 0.0,
        },
        FinancialsHighlights: [
            {
                ratioName: "",
                nameEn: "",
                nameAr: "",
                isCurrency: false,
                currency: "",
                values: [
                    {
                        year: 2021,
                        period: "",
                        value: 0,
                        fiscalPeriodType: "Quarter",
                    },
                    {
                        year: 2020,
                        period: "",
                        value: 0.0,
                        fiscalPeriodType: "Yearly",
                    },
                ],
            },
        ],
        SelectedFinancialsRatios: [
            {
                ratioName: "",
                nameEn: "",
                nameAr: "",
                isCurrency: false,
                currency: "",
                values: [
                    {
                        year: 2021,
                        period: "",
                        value: 0,
                        fiscalPeriodType: "Quarter",
                    },
                    {
                        year: 2020,
                        period: "",
                        value: 0.0,
                        fiscalPeriodType: "Yearly",
                    },
                ],
            },
        ],
        selectedEvent: {
            articleLinkURLAr: "",
            articleLinkURLEn: "",
            calendarEventID: 0,
            calendarEventTypeID: 0,
            companyID: 0,
            descriptionAr: "",
            descriptionEn: "",
            eventLocationAr: "",
            eventLocationEn: "",
            latitude: "",
            longitude: "",
            marketID: 0,
            occursOn: "",
            titleAr: "",
            titleEn: "",
            marketNameAr: "",
            marketNameEn: "",
            typeNameAr: "",
            typeNameEn: "",
            companyNameAr: "",
            companyNameEn: "",
        },
        InvestmentCalculatorForm: {
            Dates: "",
            ReInvest: false,
            AmountOrShares: 10,
            Mode: "Amount",
        },
        InvestmentCalculator: {
            amountInvested: 0,
            initialSharePrice: 0,
            endsSharePrice: 0,
            yearBeforeSharePrice: 0,
            investmentDate: "2021-11-06T19:12:55.386Z",
            endsDate: "2021-11-06T19:12:55.386Z",
            yearBeforeDate: "2021-11-06T19:12:55.386Z",
            dividendAmount: 0,
            sharesBought: 0,
            newShares: 0,
            totalShareOwn: 0,
            currentStanding: 0,
            dividendReInvested: false,
            changeAmount: 0,
            changeAmountPercentage: 0,
            changeSharePrice: 0,
            changePercentageSharePrice: 0,
            changeAnnualize: 0,
            changeAnnualizePercentage: 0,
        },
        DividendReInvested: [
            {
                amountInvested: 0,
                initialSharePrice: 0,
                endsSharePrice: 0,
                yearBeforeSharePrice: 0,
                investmentDate: "2021-11-06T19:12:55.386Z",
                endsDate: "2021-11-06T19:12:55.386Z",
                yearBeforeDate: "2021-11-06T19:12:55.386Z",
                dividendAmount: 0,
                sharesBought: 0,
                newShares: 0,
                totalShareOwn: 0,
                currentStanding: 0,
                dividendReInvested: true,
                changeAmount: 0,
                changeAmountPercentage: 0,
                changeSharePrice: 0,
                changePercentageSharePrice: 0,
                changeAnnualize: 0,
                changeAnnualizePercentage: 0,
            },
        ],
        Alerts: [
            {
                alertTypeID: 0,
                typeNameEn: "",
                typeNameAr: "",
                isRange: false,
                rangeType: null,
            },
        ],
        Countries: [
            { NameEn: "Algeria", NameAr: "الجزائر", Value: "Algeria" },
            { NameEn: "Andorra", NameAr: "أندورا", Value: "Andorra" },
            { NameEn: "Angola", NameAr: "أنغولا", Value: "Angola" },
            { NameEn: "Anguilla", NameAr: "أنغويلا", Value: "Anguilla" },
            { NameEn: "Argentina", NameAr: "الأرجنتين", Value: "Argentina" },
            { NameEn: "Australia", NameAr: "أستراليا", Value: "Australia" },
            { NameEn: "Austria", NameAr: "النمسا", Value: "Austria" },
            { NameEn: "Bahamas", NameAr: "البهاما", Value: "Bahamas" },
            { NameEn: "Bahrain", NameAr: "البحرين", Value: "Bahrain" },
            { NameEn: "Bangladesh", NameAr: "بنغلاديش", Value: "Bangladesh" },
            { NameEn: "Barbados", NameAr: "باربادوس", Value: "Barbados" },
            { NameEn: "Belgium", NameAr: "بلجيكا", Value: "Belgium" },
            { NameEn: "Belize", NameAr: "بليز", Value: "Belize" },
            { NameEn: "Benin", NameAr: "بنين", Value: "Benin" },
            { NameEn: "Bermuda", NameAr: "جزر برمود", Value: "Bermuda" },
            { NameEn: "Bhutan", NameAr: "بوتان", Value: "Bhutan" },
            { NameEn: "Bolivia", NameAr: "بوليفيا", Value: "Bolivia" },
            { NameEn: "Bosina & Herzegovina", NameAr: "البوسنة و الهرسك", Value: "Bosina & Herzegovina" },
            { NameEn: "Botswana", NameAr: "بوتسوانا", Value: "Botswana" },
            { NameEn: "Brazil", NameAr: "البرازيل", Value: "Brazil" },
            { NameEn: "Bulgaria", NameAr: "بلغاريا", Value: "Bulgaria" },
            { NameEn: "Burma", NameAr: "ميانمار", Value: "Burma" },
            { NameEn: "Canada", NameAr: "كندا", Value: "Canada" },
            { NameEn: "Chile", NameAr: "تشيلي", Value: "Chile" },
            { NameEn: "China", NameAr: "الصين", Value: "China" },
            { NameEn: "Costa Rica", NameAr: "كوستاريكا", Value: "Costa Rica" },
            { NameEn: "Cuba", NameAr: "كوبا", Value: "Cuba" },
            { NameEn: "Cyprus", NameAr: "قبرص", Value: "Cyprus" },
            { NameEn: "Czech", NameAr: "التشيك", Value: "Czech" },
            { NameEn: "Denmark", NameAr: "الدنمارك", Value: "Denmark" },
            { NameEn: "Ecuador", NameAr: "الإكوادور", Value: "Ecuador" },
            { NameEn: "Egypt", NameAr: "مصر", Value: "Egypt" },
            { NameEn: "Eritrea", NameAr: "إريتريا", Value: "Eritrea" },
            { NameEn: "Ethiopia", NameAr: "إثيوبيا", Value: "Ethiopia" },
            { NameEn: "Falkland Islands", NameAr: "جزر فوكلاند", Value: "Falkland Islands" },
            { NameEn: "Faroe Island", NameAr: "جزر فارو", Value: "Faroe Island" },
            { NameEn: "Fiji", NameAr: "فيجي", Value: "Fiji" },
            { NameEn: "Finland", NameAr: "فنلندا", Value: "Finland" },
            { NameEn: "France", NameAr: "فرنسا", Value: "France" },
            { NameEn: "French Guyana", NameAr: "غويانا الفرنسية", Value: "French Guyana" },
            { NameEn: "French Polynesia", NameAr: "بولينيزيا الفرنسية", Value: "French Polynesia" },
            { NameEn: "Gabon", NameAr: "الغابون", Value: "Gabon" },
            { NameEn: "Gambia", NameAr: "غامبيا", Value: "Gambia" },
            { NameEn: "Georgia", NameAr: "جيورجيا", Value: "Georgia" },
            { NameEn: "Germany", NameAr: "ألمانيا", Value: "Germany" },
            { NameEn: "Ghana", NameAr: "غانا", Value: "Ghana" },
            { NameEn: "Gibralter", NameAr: "جبل طارق", Value: "Gibralter" },
            { NameEn: "Greece", NameAr: "اليونان", Value: "Greece" },
            { NameEn: "Greenland", NameAr: "جرينلاند", Value: "Greenland" },
            { NameEn: "Guadeloupe", NameAr: "جزر جوادلوب", Value: "Guadeloupe" },
            { NameEn: "Guam", NameAr: "جوام", Value: "Guam" },
            { NameEn: "Guatemala", NameAr: "غواتيمال", Value: "Guatemala" },
            { NameEn: "Guinea", NameAr: "غينيا", Value: "Guinea" },
            { NameEn: "Guyana Rep.", NameAr: "غيانا", Value: "Guyana Rep." },
            { NameEn: "Haiti Rep.", NameAr: "هايتي", Value: "Haiti Rep." },
            { NameEn: "Honduras Rep.", NameAr: "هندوراس", Value: "Honduras Rep." },
            { NameEn: "Hong Kong", NameAr: "هونغ كونغ", Value: "Hong Kong" },
            { NameEn: "Hungary", NameAr: "المجر", Value: "Hungary" },
            { NameEn: "Iceland", NameAr: "آيسلندا", Value: "Iceland" },
            { NameEn: "India", NameAr: "الهند", Value: "India" },
            { NameEn: "Indonesia", NameAr: "إندونيسيا", Value: "Indonesia" },
            { NameEn: "Iran", NameAr: "ايران", Value: "Iran" },
            { NameEn: "Iraq", NameAr: "العراق", Value: "Iraq" },
            { NameEn: "Ireland", NameAr: "أيرلندا", Value: "Ireland" },
            { NameEn: "Isreal", NameAr: "إسرائيل", Value: "Isreal" },
            { NameEn: "Italy", NameAr: "إيطاليا", Value: "Italy" },
            { NameEn: "Ivory Coast", NameAr: "ساحل العاج", Value: "Ivory Coast" },
            { NameEn: "Jamaica", NameAr: "جمايكا", Value: "Jamaica" },
            { NameEn: "Japan", NameAr: "اليابان", Value: "Japan" },
            { NameEn: "Jordan", NameAr: "الاردن", Value: "Jordan" },
            { NameEn: "Kenya", NameAr: "كينيا", Value: "Kenya" },
            { NameEn: "Kiribati", NameAr: "كيريباتي", Value: "Kiribati" },
            { NameEn: "North Korea", NameAr: "كوريا الشمالية", Value: "North Korea" },
            { NameEn: "Kuwait", NameAr: "الكويت", Value: "Kuwait" },
            { NameEn: "Latvia", NameAr: "لاتفيا", Value: "Latvia" },
            { NameEn: "Lebanon", NameAr: "لبنان", Value: "Lebanon" },
            { NameEn: "Liberia Rep.", NameAr: "ليبيريا", Value: "Liberia Rep." },
            { NameEn: "Libya", NameAr: "ليبيا", Value: "Libya" },
            { NameEn: "Liechtenstein", NameAr: "ليختنشتين", Value: "Liechtenstein" },
            { NameEn: "Lithuania", NameAr: "لتوانيا", Value: "Lithuania" },
            { NameEn: "Luxembourg", NameAr: "لوكسمبورغ", Value: "Luxembourg" },
            { NameEn: "Macao", NameAr: "ماكاو", Value: "Macao" },
            { NameEn: "Madagascar", NameAr: "مدغشقر", Value: "Madagascar" },
            { NameEn: "Malawi", NameAr: "مالاوي", Value: "Malawi" },
            { NameEn: "Malaysia", NameAr: "ماليزيا", Value: "Malaysia" },
            { NameEn: "Maldives", NameAr: "جزر المالديف", Value: "Maldives" },
            { NameEn: "Mali Rep.", NameAr: "مالي", Value: "Mali Rep." },
            { NameEn: "Malta", NameAr: "مالطا", Value: "Malta" },
            { NameEn: "Mauritius", NameAr: "موريشيوس", Value: "Mauritius" },
            { NameEn: "Mayotee", NameAr: "مايوت", Value: "Mayotee" },
            { NameEn: "Mexico", NameAr: "المكسيك", Value: "Mexico" },
            { NameEn: "Mongolia Rep.", NameAr: "منغوليا", Value: "Mongolia Rep." },
            { NameEn: "Morocco", NameAr: "المغرب", Value: "Morocco" },
            { NameEn: "Mozambique", NameAr: "موزمبيق", Value: "Mozambique" },
            { NameEn: "Myanmar", NameAr: "بورما", Value: "Myanmar" },
            { NameEn: "Namibia", NameAr: "ناميبيا", Value: "Namibia" },
            { NameEn: "Nauru Rep.", NameAr: "ناورو", Value: "Nauru Rep." },
            { NameEn: "Nepal", NameAr: "نيبال", Value: "Nepal" },
            { NameEn: "Netherlands", NameAr: "هولندا", Value: "Netherlands" },
            { NameEn: "New Zealand", NameAr: "نيوزيلندا", Value: "New Zealand" },
            { NameEn: "Nicaragua", NameAr: "نيكاراجوا", Value: "Nicaragua" },
            { NameEn: "Niger Rep.", NameAr: "النيجر", Value: "Niger Rep." },
            { NameEn: "Nigeria Rep.", NameAr: "نيجيريا", Value: "Nigeria Rep." },
            { NameEn: "Norfolk Island", NameAr: "جزيرة نورفولك", Value: "Norfolk Island" },
            { NameEn: "Norway", NameAr: "النرويج", Value: "Norway" },
            { NameEn: "Oman", NameAr: "سلطنة عمان", Value: "Oman" },
            { NameEn: "Pakistan", NameAr: "باكستان", Value: "Pakistan" },
            { NameEn: "Palau", NameAr: "بالاو", Value: "Palau" },
            { NameEn: "Panama", NameAr: "بنما", Value: "Panama" },
            { NameEn: "Paraguay", NameAr: "باراغواي", Value: "Paraguay" },
            { NameEn: "Peru", NameAr: "بيرو", Value: "Peru" },
            { NameEn: "Phillipines", NameAr: "الفلبين", Value: "Phillipines" },
            { NameEn: "Poland", NameAr: "بولندا", Value: "Poland" },
            { NameEn: "Portugal", NameAr: "البرتغال", Value: "Portugal" },
            { NameEn: "Qatar", NameAr: "قطر", Value: "Qatar" },
            { NameEn: "Romania", NameAr: "رومانيا", Value: "Romania" },
            { NameEn: "Russia", NameAr: "روسيا", Value: "Russia" },
            { NameEn: "Rwanda Rep.", NameAr: "رواندا", Value: "Rwanda Rep." },
            { NameEn: "Saudi Arabia", NameAr: "المملكة العربية السعودية", Value: "Saudi Arabia" },
            { NameEn: "Senegal", NameAr: "السنغال", Value: "Senegal" },
            { NameEn: "Seychelles", NameAr: "سيشيل", Value: "Seychelles" },
            { NameEn: "Singapore", NameAr: "سنغافورة", Value: "Singapore" },
            { NameEn: "Slovak Rep.", NameAr: "سلوفاكيا", Value: "Slovak Rep." },
            { NameEn: "Slovinia", NameAr: "سلوفينيا", Value: "Slovinia" },
            { NameEn: "Solomon Island", NameAr: "جزر سليمان", Value: "Solomon Island" },
            { NameEn: "Somalia", NameAr: "الصومال", Value: "Somalia" },
            { NameEn: "South Africa", NameAr: "جنوب أفريقيا", Value: "South Africa" },
            { NameEn: "South Korea", NameAr: "كوريا الجنوبية", Value: "South Korea" },
            { NameEn: "Spain", NameAr: "إسبانيا", Value: "Spain" },
            { NameEn: "Sri Lanka", NameAr: "سيريلانكا", Value: "Sri Lanka" },
            { NameEn: "Sudan", NameAr: "السودان", Value: "Sudan" },
            { NameEn: "Sweden", NameAr: "السويد", Value: "Sweden" },
            { NameEn: "Switzerland", NameAr: "سويسرا", Value: "Switzerland" },
            { NameEn: "Syria", NameAr: "سوريا", Value: "Syria" },
            { NameEn: "Taiwan", NameAr: "تايوان", Value: "Taiwan" },
            { NameEn: "Tanzania", NameAr: "تونس", Value: "Tanzania" },
            { NameEn: "Thailand", NameAr: "تايلندا", Value: "Thailand" },
            { NameEn: "Turkey", NameAr: "تركيا", Value: "Turkey" },
            { NameEn: "UAE", NameAr: "الإمارات", Value: "UAE" },
            { NameEn: "Uganda", NameAr: "أوغندا", Value: "Uganda" },
            { NameEn: "Ukraine", NameAr: "أوكرانيا", Value: "Ukraine" },
            { NameEn: "Uruguay", NameAr: "أورغواي", Value: "Uruguay" },
            { NameEn: "USA", NameAr: "الولايات المتحدة الامريكية", Value: "USA" },
            { NameEn: "Uzbekistan", NameAr: "أوزباكستان", Value: "Uzbekistan" },
            { NameEn: "Vatican City", NameAr: "دولة مدينة الفاتيكان", Value: "Vatican City" },
            { NameEn: "Venezuela", NameAr: "فنزويلا", Value: "Venezuela" },
            { NameEn: "Vietnam", NameAr: "فيتنام", Value: "Vietnam" },
            { NameEn: "Yeman (PDR)", NameAr: "جنوب اليمن", Value: "Yeman (PDR)" },
            { NameEn: "Yeman Arab Republic", NameAr: "اليمن", Value: "Yeman Arab Republic" },
            { NameEn: "Zambia", NameAr: "زامبيا", Value: "Zambia" },
            { NameEn: "Zimbabwe", NameAr: "زمبابوي", Value: "Zimbabwe" },
            { NameEn: "Palestine", NameAr: "فلسطين", Value: "Palestine" },
            { NameEn: "south korea", NameAr: "كوريا الجنوبية", Value: "south korea" },
            { NameEn: "Cayman Islands", NameAr: "جزر الكايمن", Value: "Cayman Islands" },
            { NameEn: "United Kingdom", NameAr: "المملكة المتحدة", Value: "United Kingdom" },
            { NameEn: "Kazakhstan", NameAr: "كازاخستان", Value: "Kazakhstan" },
            { NameEn: "Turkmenistan", NameAr: "تركمنستان", Value: "Turkmenistan" },
            { NameEn: "Tunisia", NameAr: "تونس", Value: "Tunisia" },
            { NameEn: "Papua New Guinea", NameAr: "بابوا غينيا الجديدة", Value: "Papua New Guinea" },
            { NameEn: "Marshall Islands", NameAr: "جزر المارشال", Value: "Marshall Islands" },
            { NameEn: "Jersey", NameAr: "جيرسي", Value: "Jersey" },
        ],
        AlertSubscriber: {
            email: "",
            firstName: "",
            lastName: "",
            jobTitle: "",
            phoneNo: "",
            countryName: "",
            languageID: this.Language == "ar" ? 1 : 2,
            platform: "Web IR",
            alertTypes: [""],
            updateCode: "",
            showCode: false,
            userMessage: "",
            isError: false,
        },
        ChartIndicator: {
            Stochastic: { yAxis: 1, type: "stochastic", linkedTo: "srmg-tasi" },
            MFI: {
                type: "mfi",
                linkedTo: "srmg-tasi",
                yAxis: 2,
                decimals: 4,
                marker: { enabled: false },
                params: { period: 14 },
            },
            RSI: { yAxis: 1, type: "rsi", linkedTo: "srmg-tasi" },
            MACD: {
                yAxis: 1,
                type: "macd",
                linkedTo: "srmg-tasi",
                params: {
                    shortPeriod: 12,
                    longPeriod: 26,
                    signalPeriod: 9,
                    period: 26,
                },
            },
            ROC: { type: "roc", linkedTo: "srmg-tasi", params: { period: 50 } },
            Momentum: {
                type: "momentum",
                linkedTo: "srmg-tasi",
                params: { period: 50 },
            },
        },
        CompanyOverview: {
            stockChanges: {
                ForDate: "2021-11-14T00:00:00",
                "1DPercentage": 0.0,
                "1DChange": 0,
                "5DPercentage": 0.0,
                "5DChange": 0.0,
                "1MPercentage": 0.0,
                "1MChnage": 0.0,
                "3MPercentage": 0.0,
                "3MChnage": 0.0,
                "6MPercentage": 0.0,
                "6MChanges": 0.0,
                "1YPercentage": 0.0,
                "1YChange": 0.0,
                YTDPercentage: 0.0,
                YTDChange: 0.0,
                "2YPercentage": 0.0,
                "2YChange": 0.0,
                "5YPercentage": 0.0,
                "5YChange": 0.0,
                YAPercentage: 0.0,
                YAChange: 0.0,
            },
            prices: [
                {
                    marketID: 0,
                    companyID: 0,
                    bid: "",
                    tradingDate: "",
                    openValue: 0,
                    closeValue: 0,
                    previousCloseValue: 0,
                    high: 0,
                    low: 0,
                    change: 0,
                    volume: 0,
                    amount: 0,
                    percentageChange: 0,
                },
            ],
            profileInfo: {
                companyID: 0,
                marketID: 0,
                bid: "",
                companyNameAr: "",
                companyNameEn: "",
                cityNameEn: "",
                cityNameAr: "",
                addressEn: "",
                addressAr: "",
                poBoxEn: "",
                phone: "",
                fax: "",
                poBoxAr: "",
                email: "",
                websiteURL: "",
                summaryEn: "",
                summaryAr: "",
                overviewEn: "",
                overviewAr: "",
                ticker: "",
            },
            events: [
                {
                    calendarEventID: 0,
                    marketID: 0,
                    companyID: 0,
                    occursOn: "2021-08-29T10:20:30.482Z",
                    titleEn: "",
                    titleAr: "",
                    descriptionEn: "",
                    descriptionAr: "",
                    calendarEventTypeID: 0,
                    eventLocationAr: "",
                    eventLocationEn: "",
                    articleLinkURLAr: "",
                    articleLinkURLEn: "",
                    latitude: "",
                    longitude: "",
                },
            ],
            financialResultPdf: {
                companyNameEn: "",
                companyNameAr: "",
                company: 0,
                year: 0,
                files: [
                    {
                        year: 0,
                        fiscalPeriod: "",
                        fileURLAr: "",
                        fileURLEn: "",
                    },
                ],
                marketID: 0,
            },
            financialRatios: {
                period: "",
                forYear: 0,
                fields: [
                    {
                        ratioName: "",
                        nameEn: "",
                        nameAr: "",
                        values: {
                            year: "",
                            period: "",
                            value: "",
                        },
                    },
                ],
            },
            discloser: [
                {
                    articleID: 0,
                    languageID: 0,
                    language: "",
                    title: "",
                    publishedOn: "",
                    link: "",
                    isLinked: true,
                    linkedToURL: "",
                    isPaid: true,
                    articleSourceName: "",
                    articleType: "",
                    articleTypeNameAr: "",
                    articleTypeNameEn: "",
                    marketTickerIDs: "",
                    showDetails: false,
                    body: "<span>Loading...</span>",
                    marketTickerChartIDs: [""],
                    companyTickerIDs: "",
                    companyTickerChartIDs: [""],
                },
            ],
            latestNews: [
                {
                    articleID: 0,
                    languageID: 0,
                    language: "",
                    title: "",
                    publishedOn: "",
                    link: "",
                    isLinked: true,
                    linkedToURL: "",
                    isPaid: true,
                    articleSourceName: "",
                    articleType: "",
                    articleTypeNameAr: "",
                    articleTypeNameEn: "",
                    marketTickerIDs: "",
                    showDetails: false,
                    marketTickerChartIDs: [""],
                    companyTickerIDs: "",
                    body: "<span>Loading...</span>",
                    companyTickerChartIDs: [""],
                },
            ],
            argaamReports: [
                {
                    articleID: 0,
                    languageID: 0,
                    language: "",
                    title: "",
                    publishedOn: "",
                    link: "",
                    isLinked: true,
                    linkedToURL: "",
                    isPaid: true,
                    articleSourceName: "",
                    articleType: "",
                    articleTypeNameAr: "",
                    articleTypeNameEn: "",
                    marketTickerIDs: "",
                    showDetails: false,
                    body: "<span>Loading...</span>",
                    marketTickerChartIDs: [""],
                    companyTickerIDs: "",
                    companyTickerChartIDs: [""],
                },
            ],
            analystEstimates: [
                {
                    articleID: 0,
                    languageID: 0,
                    language: "",
                    title: "",
                    publishedOn: "",
                    link: "",
                    isLinked: true,
                    linkedToURL: "",
                    isPaid: true,
                    articleSourceName: "",
                    articleType: "",
                    showDetails: false,
                    articleTypeNameAr: "",
                    articleTypeNameEn: "",
                    marketTickerIDs: "",
                    body: "<span>Loading...</span>",
                    marketTickerChartIDs: [""],
                    companyTickerIDs: "",
                    companyTickerChartIDs: [""],
                },
            ],
            companyStockSummary: {
                companyStockPriceID: 0,
                companyID: 0,
                companyNameEn: "",
                companyNameAr: "",
                marketID: 0,
                marketNameEn: "",
                marketNameAr: "",
                sectorID: 0,
                sectorNameEn: "",
                sectorNameAr: "",
                marketStatusID: 0,
                defaultMarketID: 0,
                forDate: "2021-08-29T10:20:30.483Z",
                recordStatus: 0,
                displaySeqNo: 0,
                openValue: 0,
                closeValue: 0,
                dailyClose: 0,
                previousCloseValue: 0,
                high: 0,
                low: 0,
                indexValue: 0,
                change: 0,
                percentageChange: 0,
                volume: 0,
                amount: 0,
                contractCount: 0,
                avgVolume3Months: 0,
                avgTransactions3Months: 0,
                highPrice52weeks: 0,
                lowPrice52weeks: 0,
                y2TDChange: 0,
                ytdChange: 0,
                month6Change: 0,
                month3Change: 0,
                month2Change: 0,
                month1Change: 0,
                weekChange: 0,
                ybgnChange: 0,
                y2TDFirstChange: 0,
                y2TDFirstDate: "2021-08-29T10:20:30.483Z",
                lastProcessedEntryNo: 0,
                avgVolume12Months: 0,
                avgTransactions12Months: 0,
                avgTurnover12Months: 0,
                avgTurnover3Months: 0,
                groupID: 0,
                groupCompaniesID: 0,
                shortNameAr: "",
                shortNameEn: "",
                marketValue: 0,
            },
            dividandInfo: {
                totalRecords: 0,
                companyDividendInformationID: 0,
                companyID: 0,
                capital: 0.0,
                dividendDate: "2021-08-29T10:20:30.483Z",
                dividendAnnouncedDate: "2021-08-29T10:20:30.483Z",
                dividendDueDate: "2021-08-29T10:20:30.483Z",
                companyDividendStatusID: 0,
                cashDividend: 0,
                bonusShareDistributed: 0,
                dividendPercentage: 0,
                notesEn: "",
                notesAr: "",
                createdOn: "2021-08-29T10:20:30.483Z",
                dividendPolicy: "",
                companyDividendStatusNameEn: "",
                companyDividendStatusNameAr: "",
                numberOfShares: 0,
                cashDividendPerShare: 0,
                measuringUnitNameAr: "",
                measuringUnitNameEn: "",
                currencyNameAr: "",
                currencyNameEn: "",
                fundSize: 0,
                sectorID: 0,
            },
            cpaitalSummary: {
                companyCapitalID: 0,
                companyID: 0,
                marketID: 0,
                companyCapitalStatusID: 0,
                currentCapital: 0,
                currentShares: 0,
                bonusShares: 0,
                announcedDate: "2021-08-29T10:20:30.483Z",
                dueDate: "2021-08-29T10:20:30.483Z",
                splitDate: "2021-08-29T10:20:30.483Z",
                notesAr: "",
                notesEn: "",
                linkAr: "",
                linkEn: "",
                newCapital: 0,
                newShares: 0,
                measuringUnitID: 0,
                currencyID: 0,
                companyCapitalStatusNameAr: "",
                companyCapitalStatusNameEn: "",
                measuringUnitNameAr: "",
                measuringUnitNameEn: "",
                currencyNameAr: "",
                currencyNameEn: "",
            },
        },
        CompanyProfile: {
            profileInfo: {
                companyID: 0,
                marketID: 0,
                bid: "",
                companyNameAr: "",
                companyNameEn: "",
                cityNameEn: "",
                cityNameAr: "",
                addressEn: "",
                addressAr: "",
                poBoxEn: "",
                phone: "",
                fax: "",
                poBoxAr: "",
                email: "",
                websiteURL: "",
                summaryEn: "",
                summaryAr: "",
                overviewEn: "",
                overviewAr: "",
                ticker: "",
            },
            financialHighlights: [
                {
                    CompanyID: 0,
                    FSFieldName: "",
                    DisplayNameAr: "",
                    DisplayNameEn: "",
                    IsCurrency: false,
                    Currency: "SAR",
                    2020: 0,
                    2019: 0,
                    2018: 0,
                    2017: 0,
                    2016: 0,
                },
            ],
            tradingData: {
                freeFloatedShareID: 0,
                companyID: 0,
                marketID: 0,
                measuringUnitID: 0,
                freeFloatShareValue: 0,
                announcedDate: "2021-08-30T13:10:44.806Z",
                fiscalPeriodID: 0,
                isDeleted: true,
                createdOn: "2021-08-30T13:10:44.806Z",
                createdBy: 0,
                updatedOn: "2021-08-30T13:10:44.806Z",
                updatedBy: 0,
                totalItems: 0,
                totalCompanies: 0,
                companyName: "",
                measuringUnit: "",
                marketName: "",
                aggregatedValues: 0,
                sectorName: "",
                gicsSectorName: "",
                numberOfShares: 0,
                numberOfFreeShares: 0,
                percentage: 0,
                freeFloatedShareMarketValue: 0,
                companyWeight: 0,
                companyNameEn: "",
                companyNameAr: "",
                shortNameAr: "",
                shortNameEn: "",
                measuringUnitNameAr: "",
                measuringUnitNameEn: "",
                freeFloatedShareValues: "",
                year: 0,
                month: 0,
                sectorID: 0,
                date: "",
                hasOnlyBasicProfile: true,
                yearEndMonth: 0,
                avgTransactions3Months: 0,
                avgVolume3Months: 0,
                marketNameAr: "",
                marketNameEn: "",
                foreignOwnerShip: 0,
            },
            stockInfo: {
                companyID: 0,
                viewCount: 0,
                addressEn: "",
                addressAr: "",
                establishedOn: "",
                establishedOnDay: 0,
                establishedOnMonth: 0,
                establishedOnYear: 0,
                poBoxEn: "",
                poBoxAr: "",
                email: "",
                websiteURL: "",
                summaryEn: "",
                summaryAr: "",
                overviewEn: "",
                overviewAr: "",
                createdOn: "2021-08-30T13:10:44.806Z",
                updatedOn: "2021-08-30T13:10:44.806Z",
                phone: "",
                fax: "",
                numberOfShares: 0,
                numberOfSharesMeasuringUnitID: 0,
                nominalValue: 0,
                nominalValueMeasuringUnitID: 0,
                businessSegmentOverviewAr: "",
                businessSegmentOverviewEn: "",
                geoLocationSegmentOverviewEn: "",
                geoLocationSegmentOverviewAr: "",
                fiscalPeriodStartMonth: 0,
                foreignOwnerShip: 0,
                dividends: 0,
                marketValue: 0,
                bookValue: 0,
            },
            majorShareholder: [
                {
                    shareholderID: 0,
                    shareholderNameAr: "",
                    shareholderNameEn: "",
                    shareholderTypeNameAr: "",
                    shareholderTypeNameEn: "",
                    noOfShares: 0,
                    marketValue: 0,
                    percentage: 0,
                    notesAr: "",
                    notesEn: "",
                },
            ],
            milestones: [
                {
                    companyID: 0,
                    titleAr: "",
                    titleEn: "",
                    developmentDay: 0,
                    developmentMonth: 0,
                    developmentYear: 0,
                    fullDate: "",
                    articleLinkAr: "",
                    articleLinkEn: "",
                    totalRecords: "",
                },
            ],
        },
        CompanyChart: {
            fromDate: "",
            toDate: "",
            chartsData: [
                {
                    totalRecords: 0,
                    change: 0,
                    percentageChange: 0,
                    forTime: "",
                    companyStockPriceArchiveID: 0,
                    forDate: "",
                    tcCompanyID: 0,
                    companyID: 0,
                    entryNumber: 0,
                    volume: 0,
                    amount: 0,
                    open: 0,
                    close: 0,
                    min: 0,
                    max: 0,
                    contractCount: 0,
                    tcMarketID: 0,
                    marketID: 0,
                },
            ],
        },
        CompanyOrganizationStructure: {
            individuals: [
                {
                    individualID: 0,
                    nameEn: "",
                    nameAr: "",
                    positionID: 0,
                    positionNameEn: "",
                    positionNameAr: "",
                    companyPositionTypeID: 0,
                    companyPositionTypeNameAr: "",
                    companyPositionTypeNameEn: "",
                    profilePicURL: "assets/avatar1.png",
                    resumeHighLightAr: "",
                    resumeHighLightEn: "",
                    positionHistory: [
                        {
                            companyNameAr: "",
                            companyNameEn: "",
                            positionNameAr: "",
                            positionNameEn: "",
                            startedOn: "",
                            endedOn: "",
                        },
                    ],
                },
            ],
            Salaries: [
                {
                    year: 0,
                    boardMembersRenumerations: {
                        salaries: 0,
                        bonuses: 0,
                        otherRewards: 0,
                        total: 0,
                        notesEn: "",
                        notesAr: "",
                    },
                    executivesRenumerations: {
                        salaries: 0,
                        bonuses: 0,
                        otherRewards: 0,
                        total: 0,
                        notesEn: "",
                        notesAr: "",
                    },
                    totalsRenumerations: {
                        salaries: 0,
                        bonuses: 0,
                        otherRewards: 0,
                        total: 0,
                        notesEn: "",
                        notesAr: "",
                    },
                },
            ],
        },
        MajorShareholders: {
            shareholders: [
                {
                    shareholderID: 0,
                    shareholderNameAr: "",
                    shareholderNameEn: "",
                    shareholderTypeNameAr: "",
                    shareholderTypeNameEn: "",
                    noOfShares: 0,
                    marketValue: 0,
                    percentage: 0,
                    notesAr: "",
                    notesEn: "",
                },
            ],
            foreignOwnerships: [
                {
                    companyNameAr: "",
                    companyNameEn: "",
                    companyID: 0,
                    qfiMaximum: 0,
                    qfiActual: 0,
                    tfoMaximum: 0,
                    tfoActual: 0,
                },
            ],

        },
        FinancialResults: {
            financialResults: [
                {
                    year: 0,
                    q1en: "",
                    q1ar: "",
                    q2en: "",
                    q2ar: "",
                    q3en: "",
                    q3ar: "",
                    q4en: "",
                    q4ar: "",
                    annualen: "",
                    annualar: "",
                    managementen: "",
                    managementar: ""
                }
            ]
        },
        selectedFinRes:
        {
            year: 0,
            q1en: "",
            q1ar: "",
            q2en: "",
            q2ar: "",
            q3en: "",
            q3ar: "",
            q4en: "",
            q4ar: "",
            annualen: "",
            annualar: "",
            managementen: "",
            managementar: ""
        },
        CompanyProjects: {
            projects: [
                {
                    projectID: 0,
                    announcedDate: "",
                    projectNameAr: "",
                    projectNameEn: "",
                    countryNameAr: "",
                    countryNameEn: "",
                    cost: 0,
                    projectStatusNameAr: "",
                    projectStatusNameEn: "",
                    startDate: "",
                    expectedCompletionDate: "",
                },
            ],
            news: [
                {
                    articleid: "",
                    title: "",
                    source: "",
                    date: "",
                    link: "",
                },
            ],
        },
        CorporateActions: {
            recentDividends: {
                totalRecords: 0,
                companyDividendInformationID: 0,
                companyID: 0,
                dividendDate: "",
                dividendAnnouncedDate: "",
                dividendDueDate: "",
                companyDividendStatusID: 0,
                cashDividend: 0,
                bonusShareDistributed: 0,
                dividendPercentage: 0,
                notesEn: "",
                notesAr: "",
                createdOn: "",
                dividendPolicy: "",
                companyDividendStatusNameEn: "",
                companyDividendStatusNameAr: "",
                numberOfShares: 0,
                cashDividendPerShare: 0,
                measuringUnitNameAr: "",
                measuringUnitNameEn: "",
                currencyNameAr: "",
                currencyNameEn: "",
                fundSize: 0,
                sectorID: 0,
            },
            capitalChanges: {
                companyCapitalStatusNameAr: "",
                companyCapitalStatusNameEn: "",
                measuringUnitNameAr: "",
                measuringUnitNameEn: "",
                currencyNameAr: "",
                currencyNameEn: "",
                companyCapitalID: 0,
                companyID: 0,
                marketID: 0,
                companyCapitalStatusID: 0,
                currentCapital: 0,
                currentShares: 0,
                bonusShares: 0,
                announcedDate: "",
                dueDate: "",
                splitDate: "",
                notesAr: "",
                notesEn: "",
                linkAr: "",
                linkEn: "",
                newCapital: 0,
                newShares: 0,
                measuringUnitID: 0,
                currencyID: 0,
            },
            capitalChangeHistory: [
                {
                    ipoid: 0,
                    companyID: 0,
                    tableDate: "",
                    typeEn: "",
                    typeAr: "",
                    currentCapital: 0,
                    currentShares: 0,
                    newCapital: 0,
                    newShares: 0,
                    offeredPercentage: 0,
                    changeRate: 0,
                    notesAr: "",
                    notesEn: "",
                    linkAr: "",
                    linkEn: "",
                    ipoStatusID: 0,
                    statusNameAr: "",
                    statusNameEn: "",
                },
            ],
            capitalDividendHistory: [
                {
                    totalRecords: 0,
                    companyDividendInformationID: 0,
                    companyID: 0,
                    dividendDate: "",
                    dividendAnnouncedDate: "",
                    dividendDueDate: "",
                    companyDividendStatusID: 0,
                    cashDividend: 0,
                    bonusShareDistributed: 0,
                    dividendPercentage: 0,
                    notesEn: "",
                    notesAr: "",
                    createdOn: "",
                    dividendPolicy: "",
                    companyDividendStatusNameEn: "",
                    companyDividendStatusNameAr: "",
                    numberOfShares: 0,
                    cashDividendPerShare: 0,
                    measuringUnitNameAr: "",
                    measuringUnitNameEn: "",
                    currencyNameAr: "",
                    currencyNameEn: "",
                    fundSize: "",
                    sectorID: 0,
                },
            ],
            capitalChartData: [{ Capital: 0, FinancialYear: 200 }],
            dividendsChartData: [{ CashDividend: 0, FinancialYear: 200 }],
        },
        CompanyFStatements: {
            tabs: [
                {
                    tabNameEn: "",
                    tabNameAr: "",
                    fields: [
                        {
                            displayNameEn: "",
                            displayNameAr: "",
                            isCurrency: false,
                            currency: "",
                            values: [
                                {
                                    fiscalPeriod: "",
                                    value: 0,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        CompanyFRatios: {
            financialRatioFieldsGroups: [
                {
                    fieldGroupAr: "",
                    fieldGroupEn: "",
                    groupSeqNo: 0,
                    financialRatioFieldsGroupFields: [
                        {
                            ratioName: "",
                            nameEn: "",
                            nameAr: "",
                            isCurrency: false,
                            currency: "",
                            values: [
                                {
                                    year: "",
                                    period: "",
                                    value: "",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        PressReleases: [
            {
                pressReleaseID: 0,
                title: "",
                body: "",
                summary: "",
                createdOn: "2021-10-28T13:09:23.000Z",
                publishedOn: "2021-10-28T13:09:23.000Z",
                updatedOn: "2021-10-28T13:09:23.000Z",
                pressReleaseSourceName: "",
            },
        ],
        SelectedTab: { CompanyOverview: false, Page: false, CompanyProfile: false },
        Volume: [],
        SRMGNews: [
            {
                id: 0,
                content: "",
                created_at: "",
                date: "",
                featured_image: "",
                inside_image: "",
                news_category: { id: 0, title: "" },
                title: "",
                slug: ""
            }
        ]
    },
    mounted: function () {
        var app = this;
        this.getAccessToken()
            .then(
                function (response) {
                    app._token = response;
                    app.loadCompanyOverView(function () {
                        $(".widgets-container.overview").show({
                            duration: 800,
                            start: function () {
                                $(this).css("display", "flex");
                            },
                        });
                        $(".js-preloader").hide();
                    });
                    app.loadCompanyProfile(function () {
                        $(".widgets-container.overview").show({
                            duration: 800,
                            start: function () {
                                $(this).css("display", "flex");
                            },
                        });
                        $(".js-preloader").hide();
                    });
                    window.onpopstate = function (event) {
                        var page = "";
                        if (event.state) {
                            page = event.state.page;
                        }
                        //$("[data-cont='." + page + "']").click();
                        console.log(page);
                    };
                },
                function () {
                    app.Loading.Prices = true;
                    app.Loading.ProfileInfo = true;
                    alert("rejected !!");
                }
            )
            .catch(function (ex) {
                alert(ex);
            });
    },
    methods: {
        getSRMGNewsEnglish: function () {
            var app = this;
            var apiUrl = 'https://www.srmg.com/api/en/listnews';
            if (app.Language == "ar") {
                apiUrl = 'https://www.srmg.com/api/ar/listnews';
            }
            return this.getAccessToken().then(function (act) {
                return axios({
                    url: apiUrl,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then((res) => {
                    var articles = res.data.data;
                    $(articles).each(function (i, a) {
                        a["showDetails"] = false;
                        a["body"] = "<p><img src='https://www.srmg.com/storage/" + a.inside_image + "' />" + a.content + "</p>";
                    });
                    app.SRMGNews = articles;
                });
            });
        },
        //"news-articles/4yz2IO6qau5InZIhgyfEhFnSm0ID9u68RkTjblVg.jpg"
        getAccessToken: function () {
            var app = this;
            //debugger;
            if (this.accessTokenExpireIn < new Date()) {
                var authUrl = baseUrl + "/authenticate";
                var data = { username: api_user, password: api_password };
                return axios
                    .post(authUrl, data)
                    .then(function (response) {
                        var data_1 = response.data;
                        app._token = data_1.jwtToken;
                        app.accessTokenExpireIn = data_1.expires;
                        return Promise.resolve(response.data.jwtToken);
                    })
                    .catch(function (exception) {
                        console.log("Error:" + exception);
                        throw exception;
                        return Promise.reject(exception);
                    });
            } else {
                return Promise.resolve(this._token);
            }
        },
        LoadPage: function (pageName, loadFunc) {
            this.Loading.Page = true;
            $(".s__page").hide();
            $(".js-preloader").show();
            //history.pushState({
            //    page: window.location.hash
            //}, null, "/app.html#p_"+pageName);
            loadFunc(function () {
                $(".s__page." + pageName).fadeIn({
                    duration: 800,
                    start: function () {
                        $(this).css("display", "flex");
                        $(".js-preloader").hide();
                        $([document.documentElement, document.body]).animate(
                            {
                                scrollTop: 0,
                            },
                            100
                        );
                    },
                });
            });
            this.Loading.Page = false;
            $(".widgets-tabs li.active").removeClass("active");
            $("[data-cont='." + pageName + "']").addClass("active");
            if (pageName == "overview") {
                $(".overview-nav-container").removeClass("hide");
            } else {
                $(".overview-nav-container").addClass("hide");
            }
            this.PageLoading = true;
            window.location.hash = "p_" + pageName.toLowerCase();
        },
        getFetch: function (url) {
            const apiUrl = `${baseUrl}/api/v${api_version}/json/${url}`;
            return this.getAccessToken().then(function (act) {
                return axios({
                    url: apiUrl,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + act,
                    },
                }).then((res) => res);
            });
        },
        postFetch: function (url, data) {
            const apiUrl = `${baseUrl}/api/v${api_version}/json/${url}`;

            return this.getAccessToken().then(function (act) {
                var headers = {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + act,
                };

                return axios.post(apiUrl, data, { headers }).then(res => res);
            });
        },
        loadCompanyOverView: function (callBack) {
            var app = this;
            this.getAccessToken().then(function (response) {
                app.fetchCompanyOverView(response);
                //app.fetchCartDataSimple('overviewchart', '1D');
                app.fetchCartData('overviewchart2', '1D');
                app.fetchCompanyProfile(response);
                app.fetchCompanyFinanciaHighlights(response);
                app.fetchMajorShareholders(response);
                app.getSRMGNewsEnglish();
                callBack();
            }, function () {
                app.Loading.Page = false;
                alert("Unable to connect to Argaam!!!");
            })
                .catch(function (ex) {
                    alert(ex);
                });
        },
        fetchCompanyOverView: function (accT) {
            this.Loading.CompanyOverview = true;
            var app = this;
            this.getFetch("ir-api/overview/" + app.Language).then(resp => {
                app.CompanyOverview = resp.data;
                app.ChartHoverPoint.Date = app.CompanyOverview.prices[0].tradingDate;
                app.ChartHoverPoint.CloseValue = app.CompanyOverview.prices[0].closeValue;
                app.ChartHoverPoint.Volume = app.CompanyOverview.prices[0].volume;
                app.ChartRang.Change = app.CompanyOverview.prices[0].change;
                app.ChartRang.ChangePercentage = app.CompanyOverview.prices[0].percentageChange;
                app.MarketValue = app.CompanyProfile.tradingData.numberOfShares * app.CompanyOverview.prices[0].closeValue;
                app.Loading.CompanyOverview = false;
            }).catch(function (exception) {
                console.log('Error:' + exception);
            });
        },
        loadCompanyProfile: function (callBack) {
            var app = this;
            this.getAccessToken().then(function (response) {
                app.fetchCompanyProfile(response);
                callBack();
            }, function () {
                app.Loading.Page = false;
                alert("Unable to connect to Argaam!!!");
            }).catch(function (ex) {
                alert(ex);
            });
        },
        fetchCompanyProfile: function (accT) {
            this.Loading.CompanyProfile = true;
            var app = this;
            this.getFetch("ir-api/profile").then(resp => {
                app.CompanyProfile = resp.data;
                app.MarketValue = app.CompanyProfile.tradingData.numberOfShares * app.CompanyOverview.prices[0].closeValue;
                console.log('Setting market value');
                app.Loading.CompanyProfile = false;
            }).catch(function (exception) {
                console.log('Error:' + exception);
            });
        },
        fetchCompanyFinanciaHighlights: function (accT) {
            var app = this;
            this.getFetch("ir-api/financial-ratios-selected/FinancialHighlights?fiscalPeriodType=latest").then(resp => {
                app.FinancialsHighlights = resp.data;
            }).catch(function (exception) {
                console.log('Error:' + exception);
            });
        },
        loadCompanyChart: function (callBack) {
            var app = this;
            this.getAccessToken().then(function (response) {
                app.fetchCompanyChart(response);
                app.fetchMainChart();
                //app.fetchCartData('mainChart', 'AY');
                callBack();
            }, function () {
                app.Loading.Page = false;
                alert("Unable to connect to Argaam!!!");
            }).catch(function (ex) {
                alert(ex);
            });
        },
        fetchCompanyChart: function (accT) {
            this.Loading.CompanyChart = true;

            var from = new Date();
            var to = new Date(from.setDate(from.getDate() - 30));
            if ($("#calendar_input").attr("ends") != undefined) {
                from = new Date($("#calendar_input").attr("ends"));
            }
            else {
                from = new Date();
            }
            if ($("#calendar_input").attr("start") != undefined) {
                to = new Date($("#calendar_input").attr("start"));
            }
            $("#calendar_input").attr("placeholder", this.getDateStringDisplayLong2(to) + labelToText + this.getDateStringDisplayLong2(from));
            var app = this;
            this.getFetch("ir-api/chart-data-table/" + app.getDateString(to) + "/" + app.getDateString(from)).then(resp => {
                app.CompanyChart = resp.data;
                app.Loading.CompanyChart = false;

            }).catch(function (exception) {
                console.log('Error:' + exception);
            });
        },
        loadCompanyOrganizationStructure: function (callBack) {
            var app = this;
            this.getAccessToken().then(function (response) {
                app.fetchCompanyOrganizationStructure(response);
                setTimeout(applySalaryYearTabs, 2000);
                callBack();
            }, function () {
                app.Loading.Page = false;
                alert("Unable to connect to Argaam!!!");
            }).catch(function (ex) {
                alert(ex);
            });
        },
        fetchCompanyOrganizationStructure: function (accT) {
            this.Loading.CompanyOrganizationStructure = true;
            var app = this;
            this.getFetch("ir-api/organizational-structure/").then(resp => {
                app.CompanyOrganizationStructure = resp.data;
                app.Loading.CompanyOrganizationStructure = false;
            }).catch(function (exception) {
                console.log('Error:' + exception);
            });
        },
        loadMajorShareholders: function (callBack) {
            var app = this;
            this.getAccessToken().then(function (response) {
                app.fetchMajorShareholders(response);
                callBack();
            }, function () {
                app.Loading.Page = false;
                alert("Unable to connect to Argaam!!!");
            }).catch(function (ex) {
                alert(ex);
            });
        },
        fetchMajorShareholders: function (accT) {
            this.Loading.MajorShareholders = true;
            var app = this;
            this.getFetch("ir-api/major-shareholders/" + app.Language).then(resp => {
                app.MajorShareholders = resp.data;
                app.Loading.MajorShareholders = false;
            }).catch(function (exception) {
                console.log('Error:' + exception);
            });
        },
        loadCompanyFReports: function (callBack) {
            var app = this;
            this.getAccessToken().then(function (response) {
                app.fetchCompanyFReports(response);
                callBack();
            }, function () {
                app.Loading.Page = false;
                alert("Unable to connect to Argaam!!!");
            }).catch(function (ex) {
                alert(ex);
            });
        },
        fetchCompanyFReports: function (accT) {
            this.Loading.FinancialResults = true;
            var app = this;
            this.getFetch("ir-api/financial-results/" + app.Language).then(resp => {
                app.FinancialResults = resp.data;
                app.selectedFinRes = app.FinancialResults.financialResults[0];
                $(".financial-reports__select__btn").click(function () {
                    $(".financial-reports__select__dropdown").addClass("toggle");

                });
                app.Loading.FinancialResults = false;
            }).catch(function (exception) {
                console.log('Error:' + exception);
            });
        },
        selectFinancialResult: function (result) {

            this.selectedFinRes = result;
            $(".financial-reports__select__dropdown").removeClass("toggle");
        },
        changeInvestmentCalculatorMode: function (mode) {
            this.InvestmentCalculatorForm.Mode = mode;
            if (mode == 'Shares') {
                this.InvestmentCalculatorForm.AmountOrShares = this.InvestmentCalculator.sharesBought;
            }
            else {
                this.InvestmentCalculatorForm.AmountOrShares = this.InvestmentCalculator.amountInvested;
            }
            this.loadInvestmentCalculatorData();
        },
        loadInvestmentCalculatorData: function () {
            var app = this;
            this.getAccessToken().then(function (response) {
                app.fetchInvestmentCalculator(response);
                app.fetchDividendReInvested(response);
                app.fetchInvestmentCharts(response);
            }, function () {
                app.Loading.Page = false;
                alert("Unable to connect to Argaam!!!");
            }).catch(function (ex) {
                alert(ex);
            });
        },
        fetchDividendReInvested: function (accT) {
            var from = new Date();
            var to = new Date();
            var to = new Date(to.setDate(to.getDate() - 7));
            if ($('#demo-one-input').val().length != 0) {
                from = new Date($('#demo-one-input').val().split("-")[0].trim());
                to = new Date($('#demo-one-input').val().split("-")[1].trim());
            }
            var app = this;
            var amount = app.InvestmentCalculatorForm.Mode == 'Amount' ? app.InvestmentCalculatorForm.AmountOrShares : 0;
            var shares = app.InvestmentCalculatorForm.Mode == 'Shares' ? app.InvestmentCalculatorForm.AmountOrShares : 0;
            this.getFetch("ir-api/dividend-reinvest-details/" + amount + "/" + shares + "/" + app.getDateString(from) + "/" + app.getDateString(to)).then(resp => {
                app.DividendReInvested = resp.data;
            }).catch(function (exception) {
                console.log('Error:' + exception);
            });
        },
        fetchInvestmentCharts: function (div, type) {
            var from = new Date();
            var to = new Date();
            var to = new Date(to.setDate(to.getDate() - 7));
            if ($('#demo-one-input').val().length != 0) {
                from = new Date($('#demo-one-input').val().split("-")[0].trim());
                to = new Date($('#demo-one-input').val().split("-")[1].trim());
            }
            var app = this;
            var amount = app.InvestmentCalculatorForm.Mode == 'Amount' ? app.InvestmentCalculatorForm.AmountOrShares : 0;
            var shares = app.InvestmentCalculatorForm.Mode == 'Shares' ? app.InvestmentCalculatorForm.AmountOrShares : 0;

            this.getFetch(
                "ir-api/investment-calculator-chart-data/" +
                amount +
                "/" +
                shares +
                "/" +
                app.getDateString(from) +
                "/" +
                app.getDateString(to) +
                "/" +
                app.InvestmentCalculatorForm.ReInvest
            )
                .then((resp) => {
                    console.log(resp.data);
                    var sharePrices = [];
                    var dividendValues = [];
                    $(resp.data).each(function (i, v) {
                        sharePrices.push([
                            new Date(String(v.forDate.replace(" ", "T"))).getTime(),
                            v.sharesValue,
                        ]);
                        dividendValues.push([
                            new Date(String(v.forDate.replace(" ", "T"))).getTime(),
                            v.dividendsValue,
                        ]); //new Date(String(data[i]['date'].replace(' ', 'T'))).getTime()
                    });
                    var d = [
                        { name: "Investment", data: sharePrices },
                        { name: "Dividend Re-invested", data: dividendValues },
                    ];
                    app.setChartWithData(d, "cumulative_change", "line");
                    app.setChartWithData(d, "periodical_change", "column");
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        setChartWithData: function (data, chartDiv, chartType = "line") {
            var app = this;
            Highcharts.stockChart(chartDiv, {
                //rangeSelector: {
                //    selected: 4
                //},

                yAxis: {
                    labels: {
                        formatter: function () {
                            return (this.value > 0 ? " + " : "") + this.value + "%";
                        },
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 2,
                            color: "silver",
                        },
                    ],
                    gridLineDashStyle: "dot",
                    gridLineColor: "#707070",
                },

                plotOptions: {
                    series: {
                        showInNavigator: true,
                    },
                },

                tooltip: {
                    pointFormat:
                        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change})<br/>',
                    valueDecimals: 2,
                    split: true,
                },

                series: data,
            });
        },
        fetchInvestmentCalculator: function (accT) {
            var from = new Date();
            var to = new Date();
            var to = new Date(to.setDate(to.getDate() - 7));
            if ($("#demo-one-input").val().length != 0) {
                from = new Date($("#demo-one-input").val().split("-")[0].trim());
                to = new Date($("#demo-one-input").val().split("-")[1].trim());
            }
            var app = this;
            var amount =
                app.InvestmentCalculatorForm.Mode == "Amount"
                    ? app.InvestmentCalculatorForm.AmountOrShares
                    : 0;
            var shares =
                app.InvestmentCalculatorForm.Mode == "Shares"
                    ? app.InvestmentCalculatorForm.AmountOrShares
                    : 0;

            this.getFetch(
                "ir-api/investment-calculator/" +
                amount +
                "/" +
                shares +
                "/" +
                app.getDateString(from) +
                "/" +
                app.getDateString(to) +
                "/" +
                app.InvestmentCalculatorForm.ReInvest
            )
                .then((resp) => {
                    app.InvestmentCalculator = resp.data;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        loadCompanyFStatements: function (callBack) {
            var app = this;
            this.getAccessToken()
                .then(
                    function (response) {
                        app.fetchCompanyFStatements(response);
                        callBack();
                    },
                    function () {
                        app.Loading.Page = false;
                        alert("Unable to connect to Argaam!!!");
                    }
                )
                .catch(function (ex) {
                    alert(ex);
                });
        },
        fetchCompanyFStatements: function (accT) {
            this.Loading.CompanyFStatements = true;
            var app = this;
            this.getFetch("ir-api/financial-statements/" + app.Language)
                .then((resp) => {
                    app.CompanyFStatements = resp.data;
                    app.Loading.CompanyFStatements = false;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        fetchCompanyFStatementsForPeriod: function (fiscalPeriodType) {
            $(".main-financial-statement__tabs li.active").removeClass("active");
            $("[data-cont='.fs-tab-" + fiscalPeriodType + "']").addClass("active");
            $(".fs-annual .scroll-container").scrollLeft(
                $(".fs-annual .scroll-container").scrollLeft() * -1
            );
            this.Loading.CompanyFStatements = true;
            var app = this;
            this.getFetch(
                "ir-api/financial-statements/" +
                app.Language +
                "?fiscalPeriodType=" +
                fiscalPeriodType
            )
                .then((resp) => {
                    app.CompanyFStatements = resp.data;
                    app.Loading.CompanyFStatements = false;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
            app.fetchSelectedFRatiosForPeriod(fiscalPeriodType);
            app.fetchCompanyFReports();
        },
        loadCompanyFRatios: function (callBack) {
            var app = this;
            this.getAccessToken()
                .then(
                    function (response) {
                        app.fetchCompanyFRatios(response);
                        callBack();
                    },
                    function () {
                        app.Loading.Page = false;
                        alert("Unable to connect to Argaam!!!");
                    }
                )
                .catch(function (ex) {
                    alert(ex);
                });
        },
        loadSubscription: function (callBack) {
            var app = this;
            this.getAccessToken()
                .then(
                    function (response) {
                        app.fetchSubscriptionData(response);
                        callBack();
                    },
                    function () {
                        app.Loading.Page = false;
                        alert("Unable to connect to Argaam!!!");
                    }
                )
                .catch(function (ex) {
                    alert(ex);
                });
        },
        fetchSubscriptionData: function (accT) {
            var app = this;
            this.getFetch("ir-api/get-alerts/")
                .then((resp) => {
                    app.Alerts = resp.data;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        fetchCompanyFRatios: function (accT) {
            this.Loading.CompanyFRatios = true;
            var app = this;
            this.getFetch("ir-api/financial-ratios/")
                .then((resp) => {
                    app.CompanyFRatios = resp.data;
                    app.Loading.CompanyFRatios = false;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        fetchCompanyFRatiosForPeriod: function (fiscalPeriodType) {
            $(".main-financial-ratio__tabs li.active").removeClass("active");
            $("[data-cont='.fr-tab-" + fiscalPeriodType + "']").addClass("active");
            $(".ra-annual .scroll-container").scrollLeft(
                $(".ra-annual .scroll-container").scrollLeft() * -1
            );
            this.Loading.CompanyFRatios = true;
            var app = this;
            this.getFetch(
                "ir-api/financial-ratios?fiscalPeriodType=" + fiscalPeriodType
            )
                .then((resp) => {
                    app.CompanyFRatios = resp.data;
                    app.Loading.CompanyFRatios = false;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        fetchSelectedFRatiosForPeriod: function (fiscalPeriodType) {
            //$(".main-financial-ratio__tabs li.active").removeClass("active");
            //$("[data-cont='.fr-tab-" + fiscalPeriodType + "']").addClass("active");
            //$('.ra-annual .scroll-container').scrollLeft($('.ra-annual .scroll-container').scrollLeft() * -1);
            var app = this;
            this.getFetch(
                "ir-api/financial-ratios-selected/Ratio?fiscalPeriodType=" +
                fiscalPeriodType
            )
                .then((resp) => {
                    app.SelectedFinancialsRatios = resp.data;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        loadCorporateActions: function (callBack) {
            var app = this;
            this.getAccessToken()
                .then(
                    function (response) {
                        app.fetchCorporateActions(response);
                        callBack();
                    },
                    function () {
                        app.Loading.Page = false;
                        alert("Unable to connect to Argaam!!!");
                    }
                )
                .catch(function (ex) {
                    alert(ex);
                });
        },
        fetchCorporateActions: function (accT) {
            this.Loading.CorporateActions = true;
            var app = this;
            this.getFetch("ir-api/corporate-actions/" + app.Language)
                .then((resp) => {
                    app.CorporateActions = resp.data;
                    var capitalData = [];
                    var cpaitalCategories = [];
                    app.CorporateActions.capitalChartData.forEach(function (v) {
                        capitalData.push(v.Capital);
                        cpaitalCategories.push(v.FinancialYear);
                    });
                    app.populateChart(
                        capitalData,
                        cpaitalCategories,
                        "capital_change_chart",
                        "",
                        50
                    );
                    var dividendData = [];
                    var devidendCategories = [];
                    app.CorporateActions.dividendsChartData.forEach(function (v) {
                        dividendData.push(v.Capital);
                        devidendCategories.push(0);
                    });
                    app.populateChart(
                        dividendData,
                        devidendCategories,
                        "historical_dividends_chart",
                        "",
                        80
                    );

                    app.Loading.CorporateActions = false;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        loadProjects: function (callBack) {
            var app = this;
            this.getAccessToken()
                .then(
                    function (response) {
                        app.fetchProjects(response);
                        callBack();
                    },
                    function () {
                        app.Loading.Page = false;
                        alert("Unable to connect to Argaam!!!");
                    }
                )
                .catch(function (ex) {
                    alert(ex);
                });
        },
        fetchProjects: function (accT) {
            this.Loading.CompanyProjects = true;
            var app = this;
            this.getFetch("ir-api/projects-news/" + app.Language)
                .then((resp) => {
                    app.CompanyProjects = resp.data;
                    app.Loading.CompanyProjects = false;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        loadDisclosures: function (callBack) {
            callBack();
        },
        toAvatar: function (imgURL) {
            return imgURL ? imgURL : "assets/avatar1.png";
        },
        getIndividualsByPosition: function (individuals, positionID) {
            var result;
            if (individuals) {
                result = individuals.filter(function (individual) {
                    if (individual) {
                        return individual.companyPositionTypeID === positionID;
                    }
                });

                //now make them unique
                var uniqueIndividuals = [];
                var individualIDs = [];
                $.each(result, function () {
                    if ($.inArray(this.individualID, individualIDs) === -1) {
                        individualIDs.push(this.individualID);
                        uniqueIndividuals.push(this);
                    }
                });

                return uniqueIndividuals.sort();
            }

            return result;
        },
        toFileURL: function (fileURL) {
            return fileURL ? fileURL : "#";
        },
        fetchCartDataSimple: function (chartDiv, period, chartType = "line") {
            $(".ticker-tab [data-cont]").removeClass("active");
            $('.ticker-tab [data-cont="' + period + '"]').addClass("active");
            var apiUrl =
                baseUrl +
                "/api/v" +
                api_version +
                "/json/ir-api/charts-data/0/" +
                period;
            var app = this;
            axios
                .get(apiUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + app._token,
                    },
                })
                .then(function (response) {
                    app.chartData = response.data.data;
                    var data = app.chartData;
                    Highcharts.stockChart(chartDiv, {
                        chart: {
                            renderTo: chartDiv,
                            backgroundColor: "transparent",
                        },
                        rangeSelector: {
                            enabled: false,
                        },
                        plotOptions: {
                            series: {
                                lineWidth: 2,
                            },
                        },
                        responsive: {
                            rules: [
                                {
                                    condition: {
                                        maxWidth: 500,
                                    },
                                    chartOptions: {
                                        legend: {
                                            enabled: false,
                                        },
                                    },
                                },
                            ],
                        },
                        series: [
                            {
                                name: app.Language == "en" ? "SRMG" : "الأبحاث و الإعلام ",
                                // type: 'area',
                                type: chartType,
                                data: data,
                                animation: app.Language == "en",
                                color: "#fff",
                                tooltip: {
                                    valueDecimals: 2,
                                },
                               // turboThreshold: 1000000,
                            },
                        ],
                        exporting: {
                            enabled: false,
                        },
                        yAxis: [
                            {
                                showFirstLabel: true,
                                showLastLabel: true,
                                id: "main-series",
                                startOfWeek: 0,
                               // opposite: app.Language == "ar",
                                gridLineWidth: 0,
                                labels: {
                                    enabled: false,
                                    verticalAlign: 'bottom',
                                    textAlign: 'center',

                                },
                                gridLineDashStyle: "dot",
                                gridLineColor: "#707070",
                            },
                        ],
                        xAxis: [
                            {
                                id: "main-series",
                               // reversed: app.Language == "ar",
                                gridLineWidth: 0,

                                labels: {
                                    align: "center",
                                    enabled: false,
                                },
                            },
                        ],
                        tooltip: {
                            enabled: false,
                        },
                        credits: {
                            enabled: false,
                        },
                        annotationsOptions: { enabledButtons: false },
                        navigator: { enabled: false },
                        scrollbar: { enabled: false },
                    });
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        fetchCartData: function (chartDiv, period, chartType = "line") {
            $(".ticker-tab [data-cont]").removeClass("active");
            $('.ticker-tab [data-cont="' + period + '"]').addClass("active");

            var apiUrl =
                baseUrl +
                "/api/v" +
                api_version +
                "/json/ir-api/charts-data/0/" +
                period;
            var app = this;
            axios
                .get(apiUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + app._token,
                    },
                })
                .then(function (response) {
                    app.chartData = response.data.data;
                    var data = app.chartData;
                    var minTicks = 24 * 3600 * 1000;
                    var xAxisformat = "";
                    if ((period.includes("D") || period.includes("M")) && period != "YTD") {
                        xAxisformat = "%e-%b";
                    } else {
                        xAxisformat = "%b-%y";
                    }
                    if (period.includes("1D")) {
                        xAxisformat = "%H:%M";
                        minTicks = 60 * 15;
                        app.ChartRang.Change = app.CompanyOverview.prices[0].change;
                        app.ChartRang.ChangePercentage =
                            app.CompanyOverview.prices[0].percentageChange;
                    } else {
                        app.ChartRang.Change = app.CompanyOverview.stockChanges[period + "Change"];
                        app.ChartRang.ChangePercentage = app.CompanyOverview.stockChanges[period + "Percentage"];
                    }
                    Highcharts.stockChart(chartDiv, {
                        chart: {
                            renderTo: chartDiv,
                            backgroundColor: "transparent",
                        },
                        rangeSelector: {
                            enabled: false,
                        },
                        plotOptions: {
                            series: {
                                lineWidth: 2,
                            },
                        },
                        responsive: {
                            rules: [
                                {
                                    condition: {
                                        maxWidth: 500,
                                    },
                                    chartOptions: {
                                        legend: {
                                            enabled: false,
                                        },
                                    },
                                },
                            ],
                        },
                        series: [
                            {
                                name: app.Language == "en" ? "SRMG" : "الأبحاث و الإعلام ",
                                // type: 'area',
                                type: chartType,
                                data: data,
                                animation: app.Language == "en",
                                color: "#000",
                                tooltip: {
                                    valueDecimals: 2,
                                },
                                turboThreshold: data.length,
                            },
                        ],
                        exporting: {
                            enabled: false,
                        },
                        yAxis: [
                            {
                                showFirstLabel: true,
                                showLastLabel: true,
                                id: "main-series",
                                startOfWeek: 0,
                               // opposite: app.Language == "ar",
                                gridLineDashStyle: "dot",
                                gridLineColor: "#707070",
                                labels: {
                                    align: "center",
                                    formatter: function () {
                                        return Highcharts.numberFormat(this.value, 0);
                                    },
                                    offset: 0,
                                    lineWidth: 1,
                                    style: {
                                        color: "#000",
                                    },
                                },
                            },
                        ],
                        xAxis: [
                            {
                                startOnTick: true,
                                showFirstLabel: true,
                                showLastLabel: true,
                                id: "main-series",
                                //reversed: app.Language == "ar",
                                ordinal: true,
                                labels: {
                                    align: "center",
                                    style: {
                                        color: "#000",
                                    },
                                    //formatter: function () {
                                    //    if (xAxisformat.length != 0) {
                                    //        return Highcharts.dateFormat(xAxisformat, this.value);
                                    //    }
                                    //    return;
                                    //},
                                },
                                lineColor: "#ccc",
                                minTickInterval: minTicks,
                            },
                        ],
                        tooltip: {
                            useHTML: true,
                            formatter: function () {
                                if (app.Language == "ar") {
                                    return (
                                        '<p style="font-style: italic;font-size:10px;margin-bottom:6px;direction:rtl;">' +
                                        Highcharts.dateFormat(period.includes("1D") ? " %e-%b-%Y (%H:%M) " : " %e-%b-%Y ",this.x) +
                                        "</p>" +
                                        "<p style='direction:rtl;'><b>السعر :</b>" +
                                        Highcharts.numberFormat(this.y, 1) +
                                        " ريال </p>");
                                } else {
                                    return (
                                        Highcharts.dateFormat(
                                            period.includes("1D") ? "%e-%b-%Y (%H:%M)" : "%e-%b-%Y",
                                            this.x
                                        ) +
                                        "<br/> <b> Price</b>: SAR " +
                                        Highcharts.numberFormat(this.y, 1)
                                    );
                                }
                            },
                        },
                        annotationsOptions: { enabledButtons: false },
                        navigator: { enabled: false },
                        scrollbar: { enabled: false },
                    });
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        chartOptionChanged: function (indicator, type) {
            var app = this;
            if (indicator == "") {
                indicator =
                    app.ChartIndicator[
                    $(".main-chart__options__select__dropdown__option.ind.active").attr(
                        "d-c"
                    )
                    ];
            }
            if (type == "") {
                type = $(
                    ".main-chart__options__select__dropdown__option.typ.active"
                ).attr("d-c");
            }
            console.log(indicator + " ~ " + type);

            app.fetchMainChart(type, indicator);
        },
        getFinancialHighlightYears: function () {
            var app = this;
            var years = [];
            Object.keys(app.CompanyProfile.financialHighlights[0]).forEach(function (
                v,
                i
            ) {
                if (app.isNumber(v)) {
                    years.push(v);
                }
            });
            return years;
        },
        setCurrencyFinancialHighlight: function (cur) {
            var app = this;
            $("[data-cont='Financials_Highlights__riyal']").removeClass("active");
            $("[data-cont='Financials_Highlights__usd']").removeClass("active");
            $(
                "[data-cont='Financials_Highlights__" + cur.toLowerCase() + "']"
            ).addClass("active");

            var years = app.getFinancialHighlightYears();
            app.CompanyProfile.financialHighlights.forEach(function (fn, i) {
                years.forEach(function (y) {
                    fn[y] = app.convertToCurrency(fn[y], fn.Currency, cur);
                    // console.log(fn.FSFieldName + ' ' + y + ' : ' + fn[y]);
                });
                fn.Currency = cur;
            });
        },
        setCurrencyFinancialStatement: function (cur) {
            var app = this;
            $("[data-cont='main-financial-statement__riyal']").removeClass("active");
            $("[data-cont='main-financial-statement__usd']").removeClass("active");
            $(
                "[data-cont='main-financial-statement__" + cur.toLowerCase() + "']"
            ).addClass("active");
            app.CompanyFStatements.tabs.forEach(function (tab) {
                tab.fields.forEach(function (field) {
                    if (field.isCurrency) {
                        field.values.forEach(function (value) {
                            value.value = app.convertToCurrency_new(
                                value.value,
                                field.currency,
                                cur
                            );
                        });
                        field.currency = cur;
                    }
                });
            });
        },
        setCurrencyFinancialRatios: function (cur) {
            var app = this;
            $("[data-cont='main-financial-ratio__usd']").removeClass("active");
            $("[data-cont='main-financial-ratio__sar']").removeClass("active");
            $(
                "[data-cont='main-financial-ratio__" + cur.toLowerCase() + "']"
            ).addClass("active");
            app.CompanyFRatios.financialRatioFieldsGroups.forEach(function (fg) {
                fg.financialRatioFieldsGroupFields.forEach(function (field) {
                    if (field.isCurrency) {
                        field.values.forEach(function (value) {
                            if (value.value !== "-") {
                                value.value = app.convertToCurrency_new(
                                    value.value,
                                    field.currency,
                                    cur
                                );
                            }
                        });
                        field.currency = cur;
                    }
                });
            });
        },
        convertToCurrency_new: function (value, from, to) {
            var exchangeRate = {
                "SAR-USD": 0.2666,
                "USD-SAR": 3.75,
                "SAR-SAR": 1.0,
                "USD-USD": 1.0,
            };
            var c = from.toUpperCase() + "-" + to.toUpperCase();
            var rate = exchangeRate[c];

            return value * rate;
        },
        convertToCurrency: function (value, from, to) {
            var exchangeRate = {
                "RIYAL-USD": 0.2666,
                "USD-RIYAL": 3.75,
                "RIYAL-RIYAL": 1.0,
                "USD-USD": 1.0,
            };
            var c = from.toUpperCase() + "-" + to.toUpperCase();
            var rate = exchangeRate[c];

            return value * rate;
        },
        fetchArticleBody: function (article) {
            var app = this;
            this.getFetch(
                "articles/get-article-amp/" + app.Language + "/" + article.articleID
            )
                .then((resp) => {
                    article.body = resp.data.ampReadyBody;
                })
                .catch(function (exception) {
                    console.log("Error:" + exception);
                });
        },
        openNews: function (section, id, article, dontLoadPage) {
            var app = this;
            app.PageLoading = true;

            if (article !== undefined) {
                article.showDetails = true;
                if (article.body == null) {
                    article.body = "<span> Loading.....</span>";
                    app.fetchArticleBody(article);
                }
            }
        },
        closeNews: function (section, id) {
            $("[rid='" + section + "_line_" + id + "']").show();
            $("[rid='" + section + "_detail_" + id + "']").hide();
        },
        closeArticle: function (section, article) {
            article.showDetails = false;
        },
        exportToExcel: function (tableID, name) {
            $("#" + tableID + " tr").show();
            var elt = document.getElementById(tableID);
            var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
            return XLSX.writeFile(wb, name + '.xlsx');
        },
        openEventPopup: function (event) {
            this.selectedEvent = event;
            $(".Calendar-popup").show();
        },
        openEvent: function (id) {
            var app = this;
            app.LoadPage("main-Disclosures", this.loadDisclosures);
            $(".pr__tabs li").removeClass("active");
            $(".pr__tabs li[data-cont='.pr__calendar']").addClass("active");
            $(".pr__section").hide();
            $(".pr__calendar").fadeIn(500);
            if (id !== 0) {
                app.showEventDetails(id);
            }
        },
        isNumber: function isNumber(input) {
            return !isNaN(parseFloat(input));
        },
        showIndividualDetails: function (id) {
            $(".structure__container").hide();
            $("[data-cont='ind_details_" + id + "']").show();
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $(".sticky-header-indicator").offset().top + 1,
                    },
                    200
                );
        },
        fomratedValue: function (val, fielName = "") {
            if (val === undefined) {
                return "";
            }
            if (val.value === undefined || val.value == "-") {
                return "-";
            }
            var percent = fielName.includes("%") ? "%" : "";
            if (fielName.trim() == "P/E") {
                return (
                    (val.value < 0
                        ? "n/m"
                        : formatter.format(val.value) + "x") + percent
                );
            }
            if (fielName.trim() == "EV/OIBDA") {
                return (
                    (val.value < 0
                        ? "(" + formatter.format(Math.abs(val.value)) + "x)"
                        : formatter.format(val.value) + "x") + percent
                );
            }
            return (
                (val.value < 0
                    ? "(" + formatter.format(Math.abs(val.value)) + ")"
                    : formatter.format(val.value)) + percent
            );
        },
        cssClassForValue: function (val) {
            if (val === undefined || val.value === undefined) {
                return "";
            }
            return val.value < 0 ? "red" : "";
        },
        fetchMainChart: function (chartType = "line", indicator = {}) {
            var apiUrl =
                baseUrl + "/api/v" + api_version + "/json/ir-api/charts-data/0/AY";
            var app = this;
            app.getAccessToken().then(function (act) {
                axios
                    .get(apiUrl, {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: "Bearer " + app._token,
                        },
                    })
                    .then(function (response) {
                        app.chartData = response.data.data;
                        var data = app.chartData;
                        var ohlc = [],
                            volume = [],ticks = [],
                            dataLength = data.length,
                            i = 1;

                        for (i; i < dataLength; i += 1) {
                            ohlc.push([
                                new Date(String(data[i]["date"].replace(" ", "T"))).getTime(), // the date
                                data[i]["open"], // open
                                data[i]["high"], // high
                                data[i]["low"], // low
                                data[i]["close"], // close
                            ]);
                            ticks.push(new Date(String(data[i]["date"].replace(" ", "T"))).getTime());
                            volume.push([
                                new Date(String(data[i]["date"].replace(" ", "T"))).getTime(), // the date
                                data[i]["volume"], // the volume
                            ]);
                            app.Volume[
                                new Date(String(data[i]["date"].replace(" ", "T"))).getTime()
                            ] = data[i]["volume"];
                        }
                        var rangeButtons = [
                            {
                                type: "day",
                                count: 5,
                                text: app.Language == "en" ? "5D" : "خمسة أيام",
                            },
                            {
                                type: "day",
                                count: 30,
                                text: app.Language == "en" ? "1M" : "شهر",
                            },
                            {
                                type: "month",
                                count: 3,
                                text: app.Language == "en" ? "3M" : "ثلاثة أشهر",

                            },
                            {
                                type: "month",
                                count: 6,
                                text: app.Language == "en" ? "6M" : "ستة أشهر",

                            },
                            {
                                type: "ytd",
                                count: 1,
                                text: app.Language == "en" ? "YTD" : "السنة حتى تاريخه",

                            },
                            {
                                type: "year",
                                count: 1,
                                text: app.Language == "en" ? "1Y" : "سنة",
                            },
                            {
                                type: "year",
                                count: 2,
                                text: app.Language == "en" ? "2Y" : "سنتين",
                            },
                            {
                                type: "all",
                                text: app.Language == "en" ? "Max" : "الأقصى",
                            },
                        ];
                        if (app.Language == "ar") {
                            rangeButtons.reverse();
                        }
                        Highcharts.stockChart("mainChart", {
                            chart: {
                                backgroundColor: "transparent",
                                color: "#000",
                            },
                            rangeSelector: {
                                selected: app.Language == "en"? 6 : 1,
                                verticalAlign: 'top',
                                buttonPosition: {
                                    align: app.Language == "ar" ? 'right' :"left"
                                },
                                inputPosition: {
                                    align: app.Language == "ar" ? 'left' : "right",
                                    x:75,
                                },
                                allButtonsEnabled: true,
                                inputDateFormat: "%e-%b-%Y" + (app.Language == "ar" ? " → " :""),
                                inputEditDateFormat: "%e-%b-%Y",
                                inputEnabled: true,
                                buttons: rangeButtons,
                                buttonTheme: {
                                    // styles for the buttons
                                    padding: 5,
                                    width:70,
                                    
                                    style: {
                                        //direction: app.Language == "ar"? 'rtl' :'ltr',
                                        align:"right",
                                        color: "#000",
                                        fontWeight: "bold"
                                    },
                                    states: {
                                        hover: {},
                                        select: {
                                            fill: "gray",
                                            style: {
                                                color: "white",
                                            },
                                        },
                                    },
                                },
                                inputStyle: {
                                    color: "gray",
                                    fontWeight: "bold",
                                    direction: app.Language == "ar" ? "rtl" : "ltr",
                                },
                                labelStyle: {
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                },
                                //inputPosition: {
                                //    y: "0px",
                                //},
                            },
                            xAxis: {
                                events: {
                                    setExtremes: function (e) {
                                        if (e.trigger === "rangeSelectorButton" && e.rangeSelectorButton.type === "day" && e.rangeSelectorButton.count== 5) {
                                            this.update({
                                                tickPositions: ticks
                                            });
                                        } else {
                                            this.update({
                                                tickPositions: null
                                            });
                                        }
                                    }
                                },
                            
                               
                                tickmarkPlacement: 'on',
                                startOnTick: true,
                                showFirstLabel: true,
                                showLastLabel: true,
                                ordinal: true,
                                tickInterval: null,
                                step: 1,
                                gridLineColor: "#000",
                                 
                               // reversed: app.Language == "ar",
                                labels: {
                                    style: {
                                        color: "#000",
                                    },
                                    padding: 15, 
                                    formatter: function () { // You can change the function according to your needs. 
                                        var xAxisformat = "%e-%b";
                                        if (this.dateTimeLabelFormat == "%e. %b") {
                                            xAxisformat = "%e-%b";
                                        } else if (this.dateTimeLabelFormat == "%b '%y") {
                                            xAxisformat = "%b-%y";
                                        } else if (this.dateTimeLabelFormat == "%H:%M") {
                                            xAxisformat = "%e-%b";
                                        }
                                        else {
                                            xAxisformat = "%Y";
                                        } 
                                        return Highcharts.dateFormat(xAxisformat, this.value);
                                    }
                                },
                                lineColor: "#999",
                                minorGridLineColor: "#000",
                                tickColor: "#999",
                                title: {
                                    style: {
                                        color: "#000"
                                    }
                                },
                                
                            },
                            exporting: {
                                enabled: false
                            },
                            yAxis: [
                                {
                                    showFirstLabel: false,
                                    showLastLabel: true,
                                    gridLineDashStyle: "dot",
                                    gridLineColor: "gray",
                                    //opposite: app.Language == "ar",
                                    labels: {
                                        enabled: true,
                                        align: "center",
                                        verticalAlign: 'middle',
                                        textAlign: 'center',
                                        style: {
                                            color: "#000",
                                        },
                                        formatter: function () {
                                            if (this.value != 0) {
                                                return this.value;
                                            } else {
                                                return "10";
                                            }
                                        },
                                    },
                                    height: "80%",
                                    resize: {
                                        enabled: true,
                                    },
                                },
                                {
                                    labels: {
                                        align: "center",
                                        verticalAlign: 'middle',
                                        textAlign: 'center',
                                        style: {
                                            color: "#000",
                                        },
                                        formatter: function () {
                                            if (this.value != 0) {
                                                return this.value;
                                            }
                                        },
                                    },
                                    top: "80%",
                                    height: "20%",
                                    offset: 0,
                                },
                                {
                                    labels: {
                                        align: "center",
                                        verticalAlign: 'middle',
                                        textAlign: 'center',
                                        style: {
                                            color: "#000",
                                        },
                                    },
                                    top: "50%",
                                    height: "20%",
                                    offset: 0,
                                    formatter: function () {
                                        if (this.value != 0) {
                                            return this.value;
                                        }
                                    },
                                },
                            ],
                            tooltip: {
                                useHTML: true,
                                formatter: function (i, v) {
                                    if (app.Language == "ar") {
                                        return (
                                            '<p style="font-style: italic;font-size:10px;margin-bottom:6px;direction:rtl;">' +
                                            Highcharts.dateFormat("%e-%b-%Y", this.x) +
                                            "</p>" +
                                            "<p style='direction:rtl;'><b>السعر : </b>" +
                                            Highcharts.numberFormat(this.y, 1) +
                                            " ريال </p><b>حجم : </b>" +
                                            toRealNumber.format(this.points[1].y)
                                        );
                                    } else {
                                        return (
                                            '<p style="font-style: italic;font-size:10px;margin-bottom:6px;">' +
                                            Highcharts.dateFormat("%e-%b-%Y", this.x) +
                                            "</p>" +
                                            "<b>Price:</b> SAR " +
                                            Highcharts.numberFormat(this.y, 1) +
                                            "<br/><b>Volume: </b>" +
                                            toRealNumber.format(this.points[1].y)
                                        );
                                    }
                                },
                            },
                            series: [
                                {
                                    type: chartType, 
                                    id: "srmg-tasi",
                                    name: app.Language == "en" ? "srmg" : "الأبحاث و الإعلام ",
                                    animation: app.Language == "en",
                                    color: "#000",
                                    data: ohlc,
                                     
                                    //turboThreshold: 10,
                                },
                                {
                                    type: "column",
                                    id: "srmg-volume",
                                    name: "SRMG Volume",
                                    data: volume,
                                    color: "#D3D3D3",
                                    yAxis: 1,
                                },
                                indicator,
                            ],
                            responsive: {
                                rules: [
                                    {
                                        condition: {
                                            maxWidth: 800,
                                        },
                                        chartOptions: {
                                            rangeSelector: {
                                                inputEnabled: false,
                                            },
                                        },
                                    },
                                ],
                            },
                        });
                    })
                    .catch(function (exception) {
                        console.log("Error:" + exception);
                    });
            });
        },
        searchCompanyPrices: function () {
            var app = this;
            this.getAccessToken().then(function (response) {
                app.fetchCompanyChart(response);
            });
            return false;
        },
        getDateString2: function (date, separater = "-") {
            return (
                String(date.getMonth() + 1).padStart(2, "0") +
                separater +
                String(date.getDate()).padStart(2, "0") +
                separater +
                String(date.getFullYear())
            );
        },
        getDateString: function (date, separater = "-") {
            return (
                String(date.getFullYear()) +
                separater +
                String(date.getMonth() + 1).padStart(2, "0") +
                separater +
                String(date.getDate()).padStart(2, "0")
            );
        },
        getDateStringDisplay: function (dateString) {
            var date = new Date(dateString.replace(/(\d+[-])(\d+[-])/, "$2$1"));
            if (date && date.toString() != 'Invalid Date' ) {
                return (
                    String(date.getFullYear()) +
                    "/" +
                    String(date.getMonth() + 1).padStart(2, "0") +
                    "/" +
                    String(date.getDate()).padStart(2, "0")
                );
            } else {
                return "-";
            }
        },
        getDateStringDisplayLong: function (dateString) {
            var date = new Date(dateString.replace(/(\d+[-])(\d+[-])/, "$2$1"));
            if (date && date.toString() != 'Invalid Date') {
                if (this.Language == "en") {
                    return (
                        String(date.getDate()).padStart(2, "0") +
                        "-" +
                        this.MonthNameEn[String(date.getMonth())] +
                        "-" +
                        String(date.getFullYear())
                    );
                } else { 
                    return (
                        String(date.getDate()).padStart(2, "0") +
                        "-" +
                        this.MonthNames[String(date.getMonth())] +
                        "-" +
                        String(date.getFullYear())
                    );
                }
            } else {
                return "-";
            }
        },
        getDateStringDisplayLong2: function (date) {
            if (date && date.toString() != 'Invalid Date') {
                if (this.Language == "en") {
                    return (
                        String(date.getDate()).padStart(2, "0") +
                        "-" +
                        this.MonthNameEn[String(date.getMonth())] +
                        "-" +
                        String(date.getFullYear())
                    );
                } else { 
                    return (
                        String(date.getDate()).padStart(2, "0") +
                        "-" +
                        this.MonthNames[String(date.getMonth())] +
                        "-" +
                        String(date.getFullYear())
                    );
                }
            } else {
                return "-";
            }
        },
        getEventForOverView: function () {
            let result = this.CompanyOverview.events;

            result = result.filter((event) => event.descriptionEn.length != 0);

            return result;
        },
        showEventDetails: function (id) {
            $("[data-cont='event__" + id + "']").addClass("is-visible");
            $("[data-cont='event__" + id + "']").show();
        },
        hideEventDetails: function (id) {
            $("[data-cont='event__" + id + "']").removeClass("is-visible");
            $("[data-cont='event__" + id + "']").hide();
        },
        toggaleEventDetails: function (id) {
            if ($("[data-cont='event__" + id + "']").hasClass("is-visible")) {
                $("[data-cont='event__" + id + "']").hide();
            } else {
                $("[data-cont='event__" + id + "']").show();
            }
        },
        getMonthNameAr: function (month) {
            return this.MonthNames[month - 1];
        },
        showChartForFinancialHighlight: function (fn) {
            var app = this;
            $(".Financials-Highlights__popup").show();
            var data = [];
            var cat = [];
            app.getFinancialHighlightYears().forEach(function (y) {
                cat.push(y);
                data.push(fn[y]);
            });
            var title = app.Language == "en" ? fn.DisplayNameEn : fn.DisplayNameAr;
            app.populateChart(data, cat, "financialhighligh_chart", title);
        },
        populateChart: function (data, category, id, title, pw = 40, unit = '', currency ='') {
            var app = this;
            Highcharts.chart(id, {
                chart: {
                    type: "column",
                    backgroundColor: "transparent",
                    style: {
                        color: "#000",
                    },
                },
                exporting: {
                    enabled: false,
                },
                title: {
                    text: title,
                    style: {
                        color: "#000",
                    },
                },
                xAxis: {
                    categories: category,
                    text: title,
                    //reversed: app.Language == "en",
                    max: category.length < 15 ? category.length - 1 : 15,
                    labels: {
                        style: {
                            color: "#000",
                        },
                        
                    },
                    lineColor: "#707070",
                },
                yAxis: {
                    title: { enabled: false },
                   // opposite: app.Language == "ar",
                    gridLineDashStyle: "dot",
                    gridLineColor: "#707070", 
                    title: {
                        align: 'high',
                        offset: 0,
                        text: unit == '%' ? '' : (app.Language == "en" ? (currency + (unit.length != 0 ? '(' + unit + ')' : '')) : unit + ' ' + currency),
                        rotation: 0,
                        y: -15
                    },
                    labels: {
                        style: {
                            color: "#000",
                        },
                        formatter: function () {
                            if (this.value != 0) {
                                return this.value + (unit == '%' ? '%':'');
                            }
                        }
                    },
                    
                },
                plotOptions: {
                    column: {
                        pointPadding: 2,
                        borderWidth: 0,
                    },
                },
                series: [
                    {
                        name: title,
                        data: data,
                        pointWidth: pw,
                        animation: app.Language == "en",
                        color: "#000",
                        tooltip: {
                            valueDecimals: 2,
                        },
                    },
                ],
                legend: {
                    enabled: false,
                },
                annotationsOptions: { enabledButtons: false },
                navigator: { enabled: false },
                scrollbar: { enabled: false },
            });
            $(".highcharts-credits").hide();
        },
        showChartForFinancialStatement: function (fsfield) {
            var app = this;
            $(".fs-popup").show();
            var data = [];
            var cat = [];
            fsfield.values.forEach(function (v) {
                data.push(v.value);
                cat.push(v.fiscalPeriod);
            });
            var title = app.Language == "en" ? fsfield.displayNameEn : fsfield.displayNameAr;
            var u = app.Language == "ar" ? "مليون" : "M";
            var c = fsfield.currency;
            if (app.Language == "ar") {
                if (fsfield.currency == "SAR") {
                    c = "ريال";
                } else {
                    c = "دولار";
                }
            }
            app.populateChart(data, cat, "fs_details_chart", title, 20, u, c);
        },
        showChartForFinancialRatio: function (fsRatio) {
            var app = this;
            $(".fr-popup").show();
            var data = [];
            var cat = [];
            fsRatio.values.forEach(function (v) {
                if (v.value !== "-") {
                    data.push(parseFloat(v.value));
                } else {
                    data.push(0);
                }
                var p = v.period == "-" ? v.year : v.period;
                cat.push(p);
            });
            var title = app.Language == "en" ? fsRatio.nameEn : fsRatio.nameAr;
            var unit = fsRatio.isPercentage ? '%' : '';
            var cur = fsRatio.isCurrency ? fsRatio.currency : '';
            app.populateChart(data, cat, "fr_details_chart", title, 20, unit, cur);
        },
        getNumberFormated: function (number) {
            return number < 0
                ? "(" + formatter.format(Math.abs(number)) + ")"
                : formatter.format(number);
        },
        checkEmailExists: function () {
            var app = this;
            if (app.validEmail(app.AlertSubscriber.email)) {
                this.getFetch("ir-api/check-email/" + app.AlertSubscriber.email)
                    .then((resp) => {
                        if (resp.data.exists) {
                            app.AlertSubscriber.showCode = true;
                        } else {
                            app.AlertSubscriber.showCode = false;
                            app.AlertSubscriber.userMessage = "";
                        }
                    })
                    .catch(function (exception) {
                        console.log("Error:" + exception);
                    });
            }
        },
        subscribe: function () {
            var app = this;
            if (app.isValidToSubscribe()) {
                this.postFetch("ir-api/subscribe-alerts/", app.AlertSubscriber)
                    .then((resp) => {
                        if (app.AlertSubscriber.showCode) {
                            if (resp.data.success) {
                                app.AlertSubscriber.userMessage =
                                    "Your subscription is updated successfully";
                                app.AlertSubscriber.isError = false;
                            } else {
                                app.AlertSubscriber.userMessage =
                                    "Unable to update your subscription";
                                app.AlertSubscriber.isError = true;
                            }
                        } else {
                            if (resp.data.success) {
                                app.AlertSubscriber.userMessage =
                                    "You are now subscribed, please check your email and confirm your subscription.";
                                app.AlertSubscriber.isError = false;
                            } else {
                                app.AlertSubscriber.userMessage = "Unable to subscribe";
                                app.AlertSubscriber.isError = true;
                            }
                        }
                        return false;
                    })
                    .catch(function (exception) {
                        console.log("Error:" + exception);
                        app.AlertSubscriber.userMessage =
                            "Unable to subscribe, due to " + exception;
                        app.AlertSubscriber.isError = true;
                    });
            }
        },
        isValidToSubscribe: function () {
            var app = this;
            if (!app.validEmail(app.AlertSubscriber.email)) {
                app.AlertSubscriber.userMessage = "A valid Email address is required";
                app.AlertSubscriber.isError = true;
                return false;
            }
            if (app.AlertSubscriber.firstName.trim().length == 0) {
                app.AlertSubscriber.userMessage = "First name is required";
                app.AlertSubscriber.isError = true;
                return false;
            }
            if (app.AlertSubscriber.lastName.trim().length == 0) {
                app.AlertSubscriber.userMessage = "Last name is required";
                app.AlertSubscriber.isError = true;
                return false;
            }
            if (app.AlertSubscriber.countryName.trim().length == 0) {
                app.AlertSubscriber.userMessage = "Country is required";
                app.AlertSubscriber.isError = true;
                return false;
            }
            if (
                app.AlertSubscriber.showCode &&
                app.AlertSubscriber.updateCode.trim().length == 0
            ) {
                app.AlertSubscriber.userMessage =
                    "Please enter the confirmation code to update your subscription";
                app.AlertSubscriber.isError = true;
                return false;
            }
            app.AlertSubscriber.alertTypes = [];
            $(".subscription-center__form__custom-checkbox__input").each(function (
                i,
                e
            ) {
                if ($(e).prop("checked")) {
                    app.AlertSubscriber.alertTypes.push($(e).attr("data-cont"));
                }
            });
            if (app.AlertSubscriber.alertTypes.length == 0) {
                app.AlertSubscriber.userMessage =
                    "You must select at least one Alert Type to subscribe to";
                app.AlertSubscriber.isError = true;
                return false;
            }

            app.AlertSubscriber.userMessage = "";
            app.AlertSubscriber.isError = false;
            return true;
        },
        resendConformationCode: function () {
            var app = this;
            if (app.validEmail(app.AlertSubscriber.email)) {
                this.getFetch("ir-api/send-code/" + app.AlertSubscriber.email)
                    .then((resp) => {
                        if (resp.data.success) {
                            app.AlertSubscriber.userMessage =
                                "Email containing confirmation code is sent, please check your inbox.";
                        }
                    })
                    .catch(function (exception) {
                        console.log("Error:" + exception);
                    });
            }
        },
        validEmail: function (email) {
            var re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        scrollToWidget: function (WidgetName) {
            var headerHeight = $(".header-sticky").outerHeight(true);
            $(".widgets-tabs li.active").removeClass("active");
            $(".widgets-tabs li[data-cont='.main-disclosures']").addClass("active");
            $(".item span").text("Company Updates");
            $(".s__page").hide();
            $(".widgets-container .main-disclosures").fadeIn(800);
            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $(WidgetName).offset().top - headerHeight - 70,
                },
                100
            );
        },
        showFinancialResult: function (period) {
            //selectedFinRes.q2en != null && selectedFinRes.q2en.length != 0
            return ((this.selectedFinRes[period + "en"] != null && this.selectedFinRes[period + "en"].length != 0) ||
                (this.selectedFinRes[period + "ar"] != null && this.selectedFinRes[period + "ar"].length != 0));
        },
        getEventDescriptionEn: function (e, trimed = true) {
            if (e.descriptionEn != null && e.descriptionEn.length != 0) {
                if (e.descriptionEn.length > 300 && trimed) {
                    return e.descriptionEn.substring(0, 300) + '...';
                } else {
                    return e.descriptionEn;
                }
            } else {
                return "Please refer to the Arabic version for the relevant details";
            }
        },
    },


    updated: function () {
        var app = this;
        var hash = window.location.hash;
        if (app.PageLoading) {
            //app.PageLoading = false;
            return;
        }
        if (hash.startsWith("#n_")) {
            hash = hash.replace("#n_", "pr__");
            var section = hash.split("|")[0];
            var article = hash.split("|")[1];
            app.openNews(section, 0);
            $(
                "#pr__disclosures_line_" +
                article +
                " .pr__disclosures__container__row__line__icon"
            ).click();
        } else if (hash.startsWith("#p_")) {
            var pn = hash.replace("#p_", "");
            if (app.CurrentPageName !== pn) {
                $("[data-cont='." + pn + "']").click();
            }
        }
    },
});
