module.exports = {
    monthsL: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    height: [4, 4.01, 4.02, 4.03, 4.04, 4.05, 4.06, 4.07, 4.08, 4.09, 4.1, 4.11, 5, 5.01, 5.02, 5.03, 5.04, 5.05, 5.06, 5.07, 5.08, 5.09, 5.1, 5.11, 6, 6.01, 6.02, 6.03, 6.04, 6.05, 6.06, 6.07, 6.08, 6.09, 6.1, 6.11],
    gender:[{
        name:"Male",
        value:"MALE"
    },
    {
        name:"Female",
        value:"FEMALE"
    }],
    DateRangeType : [{
        name: "Created Date",
        value: "CREATEDDATE",
        iSvisible:true
      },
      {
        name: "Activated Date",
        value: "ACTIVATIONDATE",
        iSvisible:true
       
      }, {
        name: "Photo uploaded date",
        value: "UPLOADED_DATE",
        iSvisible:false
      }, {
        name: "Photo vr completed date",
        value: "APPROVED_PHOTO",
        iSvisible:false
      }, {
        name: "Photo vr rejected date",
        value: "REJECTED_PHOTO",
        iSvisible:false
      }
    
      ],
    photoType:[
        {
            name:"Photo upload pending",
            value:"NOT_UPLOADED"
        },{
            name:"Photo verification pending",
            value:"PENDING_APPROVAL"
        },{
            name:"Photo verification completed",
            value:"APPROVED"
        },{
            name:"Photo verification rejected",
            value:"REJECTED"
        }

    ],
    
    userType:[{
        name:"Active",
        value:"ACTIVE"
    },
    {
        name:"Incomplete",
        value:"INCOMPLETE"
    },
    {
        name:"Inprogress",
        value:"INPROGRESS"
    }],
    reportAbuse: [{
        name: "Look Like Fake Profile",
        value: "LLFP"
    }, {
        name: "Allready Married/engaed",
        value: "AME"
    },
    {
        name: "Inappropriate Content",
        value: "INC"
    },
    {
        name: "Duplicate Profile",
        value: "DUP"
    },
    {
        name: "Spam",
        value: "SPM"
    },
    {
        name: "Others",
        value: "OTH"
    }

    ],
    created_by: [{
        value: "SELF",
        name: "Self"
    }, {
        value: "PARENTS",
        name: "Parents"
    }, {
        value: "SIBLINGS",
        name: "Siblings"
    }, {
        value: "RELATIVES",
        name: "Relatives"
    }, {
        value: "OTHER",
        name: "Other"
    }],
    rhindu: [{
        name: "Agarwal",
        value: "HIN0"
    }, {
        name: "Baria",
        value: "HIN1"
    }, {
        name: "Bhatia",
        value: "HIN2"
    }, {
        name: "Bhavasar kshatriya",
        value: "HIN3"
    }, {
        name: "Brahmbatt",
        value: "HIN4"
    }, {
        name: "Brahmin-Anavil",
        value: "HIN5"
    }, {
        name: "Brahmin-Audichys",
        value: "HIN6"
    }, {
        name: "Brahmin-Goswami/Gosavi",
        value: "HIN7"
    }, {
        name: "Brahmin-Modh",
        value: "HIN8"
    }, {
        name: "Brahmin-Nagar",
        value: "HIN9"
    }, {
        name: "Brahmin-others",
        value: "HIN10"
    }, {
        name: "Brahmin-Pushkama",
        value: "HIN11"
    }, {
        name: "Brahmin-Shrimali",
        value: "HIN12"
    }, {
        name: "Brahmin-Vyas",
        value: "HIN13"
    }, {
        name: "Gujjar",
        value: "HIN114"
    }, {
        name: "Intercaste",
        value: "HIN115"
    }, {
        name: "Kadava Patel",
        value: "HIN116"
    }, {
        name: "Kayastha",
        value: "HIN17"
    }, {
        name: "Kharwa",
        value: "HIN118"
    }, {
        name: "Khatri",
        value: "HIN119"
    }, {
        name: "Koli patel",
        value: "HIN120"
    }, {
        name: "kshatriya",
        value: "HIN121"
    }, {
        name: "Gujjar",
        value: "HIN122"
    }, {
        name: "Kutchi",
        value: "HIN123"
    }, {
        name: "Leva Patel",
        value: "HIN124"
    }, {
        name: "Lohana",
        value: "HIN125"
    }, {
        name: "Mochi",
        value: "HIN126"
    }, {
        name: "Panchal",
        value: "HIN127"
    }, {
        name: "Patel",
        value: "HIN128"
    }, {
        name: "Prajapati",
        value: "HIN129"
    }, {
        name: "Rajput",
        value: "HIN130"
    }, {
        name: "Ramanandi",
        value: "HIN131"
    }, {
        name: "SC",
        value: "HIN132"
    }, {
        name: "ST",
        value: "HIN133"
    }, {
        name: "Sathwara",
        value: "HIN134"
    }, {
        name: "Soni",
        value: "HIN135"
    }, {
        name: "Suthar",
        value: "HIN136"
    }, {
        name: "Thakkar",
        value: "HIN137"
    }, {
        name: "Thakore",
        value: "HIN138"
    }, {
        name: "Vaishnav",
        value: "HIN139"
    }, {
        name: "Vankar",
        value: "HIN140"
    }, {
        name: "Vysya",
        value: "HIN141"
    }, {
        name: "Yadav",
        value: "HIN142"
    }, {
        name: "Ad Dharmi",
        value: "HIN143"
    }, {
        name: "Adi Andhra",
        value: "HIN144"
    }, {
        name: "Adi Dravida",
        value: "HIN145"
    }, {
        name: "Adi Karnataka",
        value: "HIN146"
    }, {
        name: "Agnikula Kshatriya",
        value: "HIN147"
    }, {
        name: "Agri",
        value: "HIN148"
    }, {
        name: "Ahir Shimpi",
        value: "HIN149"
    }, {
        name: "Ahom",
        value: "HIN150"
    }, {
        name: "Ambalavasi",
        value: "HIN151"
    }, {
        name: "Arekatica",
        value: "HIN152"
    }, {
        name: "Arora",
        value: "HIN153"
    }, {
        name: "Arunthathiyar",
        value: "HIN154"
    }, {
        name: "Arya  Vysya",
        value: "HIN155"
    }, {
        name: "Ayyaraka",
        value: "HIN156"
    }, {
        name: "Badaga",
        value: "HIN156"
    }, {
        name: "Bagdi",
        value: "HIN157"
    }, {
        name: "Baidya",
        value: "HIN158"
    }, {
        name: "Baishnab",
        value: "HIN159"
    }, {
        name: "Baishya",
        value: "HIN160"
    }, {
        name: "Bajantri",
        value: "HIN161"
    }, {
        name: "Balija",
        value: "HIN162"
    }, {
        name: "Banayat Oriya ",
        value: "HIN163"
    }, {
        name: "Banik",
        value: "HIN164"
    }, {
        name: " Baniya ",
        value: "HIN165"
    }, {
        name: "Baniya-Bania",
        value: "HIN166"
    }, {
        name: "Baniya-Kumuti",
        value: "HIN167"
    }, {
        name: "Banjara",
        value: "HIN168"
    }, {
        name: "Barai",
        value: "HIN169"
    }, {
        name: "Bari",
        value: "HIN170"
    }, {
        name: "Baria",
        value: "HIN171"
    }, {
        name: "Barujibi",
        value: "HIN172"
    }, {
        name: "Besta",
        value: "HIN173"
    }, {
        name: "Bhandari",
        value: "HIN174"
    }, {
        name: "Bhatia",
        value: "HIN175"
    }, {
        name: "Bhatraju",
        value: "HIN176"
    }, {
        name: "Bhavasar kshatriya",
        value: "HIN177"
    }, {
        name: "Bhol",
        value: "HIN178"
    }, {
        name: "Bhovi",
        value: "HIN179"
    }, {
        name: "Bhoyar",
        value: "HIN180"
    }, {
        name: "Billava",
        value: "HIN181"
    }, {
        name: "Bishnoi/vishnoi",
        value: "HIN182"
    }, {
        name: "Bondili",
        value: "HIN183"
    }, {
        name: "Boyar",
        value: "HIN184"
    }, {
        name: "Brahmbatt",
        value: "HIN185"
    }, {
        name: "Brahmin-Anavil",
        value: "HIN186"
    }, {
        name: "Brahmin-Audichya",
        value: "HIN187"
    }, {
        name: "Brahmin-Barendra",
        value: "HIN188"
    }, {
        name: "Brahmin-Bhatt",
        value: "HIN189"
    }, {
        name: "Brahmin-Bhumihar",
        value: "HIN190"
    }, {
        name: "Brahmin-Daivadnya",
        value: "HIN191"
    }, {
        name: "Brahmin-Danua",
        value: "HIN192"
    }, {
        name: "Brahmin-Deshastha",
        value: "HIN193"
    }, {
        name: "Brahmin-Dhiman",
        value: "HIN194"
    }, {
        name: "Brahmin-Dravida",
        value: "HIN195"
    }, {
        name: "Brahmin-Embrandiri",
        value: "HIN196"
    }, {
        name: "Brahmin-Garhwali",
        value: "HIN197"
    }, {
        name: "Brahmin-HGaur",
        value: "HIN198"
    }, {
        name: "Brahmin-Goswami/Gosavi",
        value: "HIN199"
    }, {
        name: "Brahmin-Gujar Gaur",
        value: "HIN200"
    }, {
        name: "Brahmin-Gurukkal",
        value: "HIN201"
    }, {
        name: "Brahmin-Halua",
        value: "HIN202"
    }, {
        name: "Brahmin-Havyaka",
        value: "HIN203"
    }, {
        name: "Brahmin -Hoysala",
        value: "HIN204"
    }, {
        name: "Brahmin-Iyengar",
        value: "HIN205"
    }, {
        name: "Brahmin-Iyer",
        value: "HIN206"
    }, {
        name: "Brahmin-Jangid",
        value: "HIN207"
    }, {
        name: "Brahmin-Jhadua",
        value: "HIN208"
    }, {
        name: "Brahmin-Jyotish",
        value: "HIN209"
    }, {
        name: "Brahmin-Kanyakubj",
        value: "HIN210"
    }, {
        name: "Brahmin-Karhade",
        value: "HIN211"
    }, {
        name: "Brahmin-Khandelwal",
        value: "HIN212"
    }, {
        name: "Brahmin-Kokanasthra",
        value: "HIN213"
    }, {
        name: "Brahmin-Kota",
        value: "HIN214"
    }, {
        name: "Brahmin-Kulin",
        value: "HIN215"
    }, {
        name: "Brahmin-Kumaoni",
        value: "HIN216"
    }, {
        name: "Brahmin-Madhwa",
        value: "HIN217"
    }, {
        name: "Brahmin-Maithil",
        value: "HIN218"
    }, {
        name: "Brahmin-Modh",
        value: "HIN219"
    }, {
        name: "Brahmin-Mohyal",
        value: "HIN220"
    }, {
        name: "Brahmin-Nagar",
        value: "HIN221"
    }, {
        name: "Brahmin-Namboodiri",
        value: "HIN222"
    }, {
        name: "Brahmin-Narmadiya",
        value: "HIN223"
    }, {
        name: "Brahmin-Niyogi",
        value: "HIN224"
    }, {
        name: "Brahmin-Others",
        value: "HIN225"
    }, {
        name: "Brahmin-Paliwal",
        value: "HIN226"
    }, {
        name: "Brahmin-Panda",
        value: "HIN227"
    }, {
        name: "Brahmin-Pareek",
        value: "HIN228"
    }, {
        name: "Brahmin-Pushkarma",
        value: "HIN229"
    }, {
        name: "Brahmin-Rarhi",
        value: "HIN230"
    }, {
        name: "Brahmin-Rigvedi",
        value: "HIN231"
    }, {
        name: "Brahmin-Rudraj",
        value: "HIN232"
    }, {
        name: "Brahmin-Sakaldwipi",
        value: "HIN233"
    }, {
        name: "Brahmin-Sanadya",
        value: "HIN234"
    }, {
        name: "Brahmin-Sanketi",
        value: "HIN235"
    }, {
        name: "Brahmin-Saraswat",
        value: "HIN236"
    }, {
        name: "Brahmin-Saryuparin",
        value: "HIN237"
    }, {
        name: "Brahmin-Shivhalli",
        value: "HIN238"
    }, {
        name: "Brahmin-Shrimali",
        value: "HIN239"
    }, {
        name: "Brahmin-Sikhwal",
        value: "HIN240"
    }, {
        name: "Brahmin-Smartha",
        value: "HIN241"
    }, {
        name: "Brahmin-Sri Vaishnava",
        value: "HIN242"
    }, {
        name: "Brahmin-Stanika",
        value: "HIN243"
    }, {
        name: "Brahmin-Tyagi",
        value: "HIN244"
    }, {
        name: "Brahmin-Vaidiki",
        value: "HIN245"
    }, {
        name: "Brahmin-Vaikhanasa",
        value: "HIN246"
    }, {
        name: "Brahmin-Velanadu",
        value: "HIN247"
    }, {
        name: "Brahmin-Vyas",
        value: "HIN248"
    }, {
        name: "Brajastha Maithil",
        value: "HIN249"
    }, {
        name: "Bunt(Shetty)",
        value: "HIN250"
    }, {
        name: "CKP",
        value: "HIN251"
    }, {
        name: "Chalawadi and Holeya",
        value: "HIN252"
    }, {
        name: "Chambhar",
        value: "HIN253"
    }, {
        name: "Chandravamshi Kahar",
        value: "HIN254"
    }, {
        name: "Chasa",
        value: "HIN255"
    }, {
        name: "Chattada Sri Vaishnava",
        value: "HIN256"
    }, {
        name: "Choudary",
        value: "HIN257"
    }, {
        name: "Chaurasia",
        value: "HIN258"
    }, {
        name: "Chennadasar",
        value: "HIN259"
    }, {
        name: "Chettiar",
        value: "HIN260"
    }, {
        name: "Chhetri",
        value: "HIN261"
    }, {
        name: "Chippolu(Meera)",
        value: "HIN262"
    }, {
        name: "Coorgi",
        value: "HIN263"
    }, {
        name: "Devadiga",
        value: "HIN264"
    }, {
        name: "Devandra Kula Vellalar",
        value: "HIN265"
    }, {
        name: "Devang Koshthi",
        value: "HIN266"
    }, {
        name: "Devanga",
        value: "HIN267"
    }, {
        name: "Devar/Thevar/Mukkulathor",
        value: "HIN268"
    }, {
        name: "Devrukhe Brahmin",
        value: "HIN269"
    }, {
        name: "Dhangar",
        value: "HIN270"
    }, {
        name: "Dheevara",
        value: "HIN271"
    }, {
        name: "Dhiman",
        value: "HIN272"
    }, {
        name: "Dhoba",
        value: "HIN273"
    }, {
        name: "Dhobi",
        value: "HIN274"
    }, {
        name: "Dhor/Kakkayya",
        value: "HIN275"
    }, {
        name: "Dommala",
        value: "HIN276"
    }, {
        name: "Dumal",
        value: "HIN277"
    }, {
        name: "Dusadh(Paswan)",
        value: "HIN278"
    }, {
        name: "Ediga",
        value: "HIN279"
    }, {
        name: "Ezhava",
        value: "HIN280"
    }, {
        name: "Ezhuthachan",
        value: "HIN281"
    }, {
        name: "Gabit",
        value: "HIN282"
    }, {
        name: "Ganda",
        value: "HIN283"
    }, {
        name: "Gandia",
        value: "HIN284"
    }, {
        name: "Ganiga",
        value: "HIN285"
    }, {
        name: "Garhwali",
        value: "HIN286"
    }, {
        name: "Gatti",
        value: "HIN287"
    }, {
        name: "Gavara",
        value: "HIN288"
    }, {
        name: "Gawali",
        value: "HIN289"
    }, {
        name: "Ghisadi",
        value: "HIN290"
    }, {
        name: "Ghumar",
        value: "HIN291"
    }, {
        name: "Goala",
        value: "HIN292"
    }, {
        name: "Goan",
        value: "HIN293"
    }, {
        name: "Gomantak",
        value: "HIN294"
    }, {
        name: "Gondhali",
        value: "HIN295"
    }, {
        name: "Goud",
        value: "HIN296"
    }, {
        name: "Gounder",
        value: "HIN297"
    }, {
        name: "Gowda",
        value: "HIN298"
    }, {
        name: "Gramani",
        value: "HIN299"
    }, {
        name: "Gudia",
        value: "HIN300"
    }, {
        name: "Gujjar",
        value: "HIN301"
    }, {
        name: "Gupta",
        value: "HIN302"
    }, {
        name: "Guptan",
        value: "HIN303"
    }, {
        name: "Gaurav",
        value: "HIN304"
    }, {
        name: "Gurjar",
        value: "HIN305"
    }, {
        name: "Haiba Koshti",
        value: "HIN306"
    }, {
        name: "Helava",
        value: "HIN307"
    }, {
        name: "Hugar(Jeer)",
        value: "HIN308"
    }, {
        name: "Irani",
        value: "HIN309"
    }, {
        name: "Jaalari",
        value: "HIN310"
    }, {
        name: "Jain",
        value: "HIN311"
    }, {
        name: "Jaiswal",
        value: "HIN312"
    }, {
        name: "Jandra",
        value: "HIN313"
    }, {
        name: "Jangam",
        value: "HIN314"
    }, {
        name: "Jangra-Brahmin",
        value: "HIN315"
    }, {
        name: "Jat",
        value: "HIN316"
    }, {
        name: "Jatav",
        value: "HIN317"
    }, {
        name: "Jetty/Malla",
        value: "HIN318"
    }, {
        name: "Jijhotia-Brahmin",
        value: "HIN319"
    }, {
        name: "Jogi(Nath)",
        value: "HIN320"
    }, {
        name: "Kapol",
        value: "HIN321"
    }, {
        name: "Kachara",
        value: "HIN322"
    }, {
        name: "Kadava Patel",
        value: "HIN323"
    }, {
        name: "Kahar",
        value: "HIN324"
    }, {
        name: "kalbarta",
        value: "HIN325"
    }, {
        name: "kalal",
        value: "HIN326"
    }, {
        name: "Kalanji",
        value: "HIN327"
    }, {
        name: "Kalar",
        value: "HIN328"
    }, {
        name: "Kalinga",
        value: "HIN329"
    }, {
        name: "Kalinga Vysya",
        value: "HIN330"
    }, {
        name: "Kalita",
        value: "HIN331"
    }, {
        name: "Kalwar",
        value: "HIN332"
    }, {
        name: "Kamboj",
        value: "HIN333"
    }, {
        name: "Kamma",
        value: "HIN334"
    }, {
        name: "Kansari",
        value: "HIN335"
    }, {
        name: "Kapu",
        value: "HIN336"
    }, {
        name: "Karana",
        value: "HIN337"
    }, {
        name: "Karmakar",
        value: "HIN338"
    }, {
        name: "Karuneegar",
        value: "HIN339"
    }, {
        name: "Kasar",
        value: "HIN340"
    }, {
        name: "Kashyap",
        value: "HIN341"
    }, {
        name: "Katiya",
        value: "HIN342"
    }, {
        name: "Kavuthiya/Ezhavathy",
        value: "HIN343"
    }, {
        name: "Kayastha",
        value: "HIN344"
    }, {
        name: "Khandayat",
        value: "HIN345"
    }, {
        name: "Khandelwal",
        value: "HIN346"
    }, {
        name: "Kharwa",
        value: "HIN347"
    }, {
        name: "Kharwar",
        value: "HIN348"
    }, {
        name: "Khatri",
        value: "HIN349"
    }, {
        name: "Kirar",
        value: "HIN350"
    }, {
        name: "Kokanastha Maratha",
        value: "HIN351"
    }, {
        name: "Koli",
        value: "HIN352"
    }, {
        name: "Koli Mahadev",
        value: "HIN353"
    }, {
        name: "Koli Patel",
        value: "HIN354"
    }, {
        name: "Kongu Vellala Gounder",
        value: "HIN355"
    }, {
        name: "Konkani",
        value: "HIN356"
    }, {
        name: "Korama",
        value: "HIN357"
    }, {
        name: "Koti",
        value: "HIN358"
    }, {
        name: "Kosthi",
        value: "HIN359"
    }, {
        name: "Krishnavaka",
        value: "HIN360"
    }, {
        name: "Kshatriya",
        value: "HIN361"
    }, {
        name: "kudumbi",
        value: "HIN362"
    }, {
        name: "Kulal",
        value: "HIN363"
    }, {
        name: "Kulalar",
        value: "HIN364"
    }, {
        name: "Kulita",
        value: "HIN365"
    }, {
        name: "Kumawat",
        value: "HIN366"
    }, {
        name: "Kumbhakar",
        value: "HIN367"
    }, {
        name: "Kumbhar",
        value: "HIN368"
    }, {
        name: "Kumhar",
        value: "HIN369"
    }, {
        name: "Kummari",
        value: "HIN370"
    }, {
        name: "Kunbi",
        value: "HIN371"
    }, {
        name: "Kuravan",
        value: "HIN372"
    }, {
        name: "Kurmi/Kurmi Kshatriya",
        value: "HIN373"
    }, {
        name: "Kuruba",
        value: "HIN374"
    }, {
        name: "Kuruhina Shetty",
        value: "HIN375"
    }, {
        name: "Kurumbar",
        value: "HIN376"
    }, {
        name: "Kushwaha(Koin)",
        value: "HIN377"
    }, {
        name: "Kutchi",
        value: "HIN378"
    }, {
        name: "Lambadi",
        value: "HIN379"
    }, {
        name: "Leva Patel",
        value: "HIN380"
    }, {
        name: "Leva Patil",
        value: "HIN381"
    }, {
        name: "Lingayath",
        value: "HIN382"
    }, {
        name: "Lodhi Rajput",
        value: "HIN383"
    }, {
        name: "Lahana",
        value: "HIN384"
    }, {
        name: "Lohar",
        value: "HIN385"
    }, {
        name: "Loniya",
        value: "HIN386"
    }, {
        name: "Lubana",
        value: "HIN387"
    }, {
        name: "Madiga",
        value: "HIN388"
    }, {
        name: "Mahajan",
        value: "HIN389"
    }, {
        name: "Mahar",
        value: "HIN390"
    }, {
        name: "Mahendra",
        value: "HIN391"
    }, {
        name: "Maheshwari",
        value: "HIN392"
    }, {
        name: "Mahishya",
        value: "HIN393"
    }, {
        name: "Majabi",
        value: "HIN394"
    }, {
        name: "Mala",
        value: "HIN395"
    }, {
        name: "Mali",
        value: "HIN396"
    }, {
        name: "Mallah",
        value: "HIN397"
    }, {
        name: "Malviya Brahmin",
        value: "HIN398"
    }, {
        name: "Mangalorean",
        value: "HIN399"
    }, {
        name: "Manipuri",
        value: "HIN400"
    }, {
        name: "Mapila",
        value: "HIN401"
    }, {
        name: "Maratha",
        value: "HIN402"
    }, {
        name: "Maruthuvar",
        value: "HIN403"
    }, {
        name: "Matang",
        value: "HIN404"
    }, {
        name: "Mathur",
        value: "HIN405"
    }, {
        name: "Maurya/Shakya",
        value: "HIN406"
    }, {
        name: "Meena",
        value: "HIN407"
    }, {
        name: "Meenavar",
        value: "HIN408"
    }, {
        name: "Mehra",
        value: "HIN409"
    }, {
        name: "Meru Darji",
        value: "HIN410"
    }, {
        name: "Mochi",
        value: "HIN411"
    }, {
        name: "Modak",
        value: "HIN412"
    }, {
        name: "Mogaveera",
        value: "HIN413"
    }, {
        name: "Mudaliyar",
        value: "HIN414"
    }, {
        name: "Mudiraj",
        value: "HIN415"
    }, {
        name: "Munnuru Kapu",
        value: "HIN416"
    }, {
        name: "Mathuraja",
        value: "HIN417"
    }, {
        name: "Naagavamsam",
        value: "HIN418"
    }, {
        name: "Nadar",
        value: "HIN419"
    }, {
        name: "Nagaralu",
        value: "HIN420"
    }, {
        name: "Nal",
        value: "HIN421"
    }, {
        name: "Naicker",
        value: "HIN422"
    }, {
        name: "Naidu",
        value: "HIN423"
    }, {
        name: "Naik",
        value: "HIN424"
    }, {
        name: "Nair",
        value: "HIN425"
    }, {
        name: "Namasudra/Namassej",
        value: "HIN426"
    }, {
        name: "Nambiar",
        value: "HIN427"
    }, {
        name: "Napit",
        value: "HIN428"
    }, {
        name: "Nayyaka",
        value: "HIN429"
    }, {
        name: "Neeli",
        value: "HIN430"
    }, {
        name: "Nepali",
        value: "HIN431"
    }, {
        name: "Nhavi",
        value: "HIN432"
    }, {
        name: "Oswal",
        value: "HIN433"
    }, {
        name: "Otari",
        value: "HIN434"
    }, {
        name: "Padmasali",
        value: "HIN435"
    }, {
        name: "Pal",
        value: "HIN436"
    }, {
        name: "Panchal",
        value: "HIN437"
    }, {
        name: "Pandaram",
        value: "HIN438"
    }, {
        name: "Panicker",
        value: "HIN439"
    }, {
        name: "Parkava Kulam",
        value: "HIN440"
    }, {
        name: "Parsi",
        value: "HIN441"
    }, {
        name: "Partraj",
        value: "HIN442"
    }, {
        name: "Pasi",
        value: "HIN443"
    }, {
        name: "Patel",
        value: "HIN444"
    }, {
        name: "Pathare Prabhu",
        value: "HIN445"
    }, {
        name: "Patnaick/Sistakaranam",
        value: "HIN446"
    }, {
        name: "Patra",
        value: "HIN447"
    }, {
        name: "Perika",
        value: "HIN448"
    }, {
        name: "Pillai",
        value: "HIN449"
    }, {
        name: "Poosala",
        value: "HIN450"
    }, {
        name: "Porwal",
        value: "HIN451"
    }, {
        name: "Prajapari",
        value: "HIN452"
    }, {
        name: "Raigar",
        value: "HIN453"
    }, {
        name: "Rajaka",
        value: "HIN454"
    }, {
        name: "Rajastani",
        value: "HIN455"
    }, {
        name: "Rajbhar",
        value: "HIN456"
    }, {
        name: "Rajbonshi",
        value: "HIN457"
    }, {
        name: "Rajpurohit",
        value: "HIN458"
    }, {
        name: "Rajput",
        value: "HIN459"
    }, {
        name: "Ramanandi",
        value: "HIN460"
    }, {
        name: "Ramdasai",
        value: "HIN461"
    }, {
        name: "Ramgariah",
        value: "HIN462"
    }, {
        name: "Ramoshi",
        value: "HIN463"
    }, {
        name: "Ravidasia",
        value: "HIN464"
    }, {
        name: "Rawat",
        value: "HIN465"
    }, {
        name: "Reddy",
        value: "HIN466"
    }, {
        name: "Relli",
        value: "HIN467"
    }, {
        name: "Ror",
        value: "HIN468"
    }, {
        name: "SKP",
        value: "HIN469"
    }, {
        name: "Sadgope",
        value: "HIN470"
    }, {
        name: "Sagara(Uppara)",
        value: "HIN471"
    }, {
        name: "Saha",
        value: "HIN472"
    }, {
        name: "Sahu",
        value: "HIN473"
    }, {
        name: "Saini",
        value: "HIN473"
    }, {
        name: "Saliya",
        value: "HIN474"
    }, {
        name: "Sathwara",
        value: "HIN475"
    }, {
        name: "Savji",
        value: "HIN476"
    }, {
        name: "Senai Thalaivar",
        value: "HIN477"
    }, {
        name: "Senguntha Mudaliyar",
        value: "HIN478"
    }, {
        name: "Settibalija",
        value: "HIN479"
    }, {
        name: "Shimpi Namdev",
        value: "HIN480"
    }, {
        name: "Sindhi",
        value: "HIN481"
    }, {
        name: "Sindhi-Amil",
        value: "HIN482"
    }, {
        name: "Sindhi-Baibhand",
        value: "HIN483"
    }, {
        name: "Sindhi-Bhanusalir",
        value: "HIN484"
    }, {
        name: "Sindhi-Bhatia",
        value: "HIN485"
    }, {
        name: "Sindhi-Chhapru",
        value: "HIN486"
    }, {
        name: "Sindhi-Dadu",
        value: "HIN487"
    }, {
        name: "Sindhi-Hyderabadi",
        value: "HIN488"
    }, {
        name: "Sindhi-Larai",
        value: "HIN489"
    }, {
        name: "Sindhi-Larkana",
        value: "HIN490"
    }, {
        name: "Sindhi-Lohana",
        value: "HIN491"
    }, {
        name: "Sindhi-Rohiri",
        value: "HIN492"
    }, {
        name: "Sindhi-Sahit",
        value: "HIN493"
    }, {
        name: "Sindhi-Sakkhar",
        value: "HIN494"
    }, {
        name: "Sindhi-sehwani",
        value: "HIN495"
    }, {
        name: "Sindhi-Shikarpuri",
        value: "HIN496"
    }, {
        name: "Sindhi-Thatai",
        value: "HIN497"
    }, {
        name: "Sonar",
        value: "HIN498"
    }, {
        name: "Soni",
        value: "HIN499"
    }, {
        name: "Sourashtra",
        value: "HIN500"
    }, {
        name: "Sozhiya Vellalar",
        value: "HIN501"
    }, {
        name: "Srisayana",
        value: "HIN502"
    }, {
        name: "Sugali(Naika)",
        value: "HIN503"
    }, {
        name: "Sunari",
        value: "HIN504"
    }, {
        name: "Sundhi",
        value: "HIN505"
    }, {
        name: "Surya Balija",
        value: "HIN506"
    }, {
        name: "Suthar",
        value: "HIN507"
    }, {
        name: "Swakula Sali",
        value: "HIN508"
    }, {
        name: "Tamboli",
        value: "HIN509"
    }, {
        name: "Tanti",
        value: "HIN510"
    }, {
        name: "Tantubai",
        value: "HIN511"
    }, {
        name: "Telaga",
        value: "HIN512"
    }, {
        name: "Teli",
        value: "HIN513"
    }, {
        name: "Thakkar",
        value: "HIN514"
    }, {
        name: "Thakore",
        value: "HIN515"
    }, {
        name: "Kalwar",
        value: "HIN516"
    }, {
        name: "Thakur",
        value: "HIN517"
    }, {
        name: "Thigala",
        value: "HIN518"
    }, {
        name: "Thiyya",
        value: "HIN519"
    }, {
        name: "Tili",
        value: "HIN520"
    }, {
        name: "Togata",
        value: "HIN521"
    }, {
        name: "Tonik Kshatriya",
        value: "HIN522"
    }, {
        name: "Turupu Kapu",
        value: "HIN523"
    }, {
        name: "Urali Gounder",
        value: "HIN524"
    }, {
        name: "Urs",
        value: "HIN525"
    }, {
        name: "Vada Balija",
        value: "HIN526"
    }, {
        name: "Vaaddera",
        value: "HIN527"
    }, {
        name: "Vaish",
        value: "HIN528"
    }, {
        name: "Vaishnav",
        value: "HIN529"
    }, {
        name: "Vaishya",
        value: "HIN530"
    }, {
        name: "Vaishya Vani",
        value: "HIN531"
    }, {
        name: "Valluvan",
        value: "HIN532"
    }, {
        name: "Valmiki",
        value: "HIN533"
    }, {
        name: "Vania",
        value: "HIN534"
    }, {
        name: "Vanika Vyshya",
        value: "HIN535"
    }, {
        name: "Vaniya",
        value: "HIN536"
    }, {
        name: "Vanjara",
        value: "HIN537"
    }, {
        name: "Vanjari",
        value: "HIN538"
    }, {
        name: "Vankar",
        value: "HIN539"
    }, {
        name: "Vannar",
        value: "HIN540"
    }, {
        name: "Vannia Kula Kshatriyar",
        value: "HIN541"
    }, {
        name: "Variar",
        value: "HIN542"
    }, {
        name: "Varshney",
        value: "HIN543"
    }, {
        name: "Veera Salvam",
        value: "HIN544"
    }, {
        name: "Velaan",
        value: "HIN545"
    }, {
        name: "Velama",
        value: "HIN546"
    }, {
        name: "Vellalar",
        value: "HIN547"
    }, {
        name: "Veluthedathu Nair",
        value: "HIN548"
    }, {
        name: "Vettuva Gounder",
        value: "HIN549"
    }, {
        name: "Vilakkithala Nair",
        value: "HIN550"
    }, {
        name: "Vishwakarma",
        value: "HIN551"
    }, {
        name: "Viswabrahmin",
        value: "HIN552"
    }, {
        name: "Vokkaliga",
        value: "HIN553"
    }, {
        name: "Vysya",
        value: "HIN554"
    }, {
        name: "Yadav",
        value: "HIN555"
    }, {
        name: "Yellapu",
        value: "HIN556"
    }, {
        name: "Don't wish to specify",
        value: "HIN557"
    }, {
        name: "Other",
        value: "HINOTH"
    }],
    rmuslim: [{
        name: "Ansari",
        value: "MUS0"
    }, {
        name: "Arain",
        value: "MUS1"
    }, {
        name: "Awan",
        value: "MUS2"
    }, {
        name: "Bohra",
        value: "MUS3"
    }, {
        name: "Dekkani",
        value: "MUS4"
    }, {
        name: "Dudekula",
        value: "MUS5"
    }, {
        name: "Hanafi",
        value: "MUS6"
    }, {
        name: "Jat",
        value: "MUS7"
    }, {
        name: "Khoja",
        value: "MUS8"
    }, {
        name: "Lebbai",
        value: "MUS9"
    }, {
        name: "Malik",
        value: "MUS10"
    }, {
        name: "Mapila",
        value: "MUS11"
    }, {
        name: "Maraicar",
        value: "MUS12"
    }, {
        name: "Memon",
        value: "MUS13"
    }, {
        name: "Mugal",
        value: "MUS14"
    }, {
        name: "Pathan",
        value: "MUS15"
    }, {
        name: "Qureshi",
        value: "MUS16"
    }, {
        name: "Rajput",
        value: "MUS17"
    }, {
        name: "Rowther",
        value: "MUS18"
    }, {
        name: "Other",
        value: "MUSOTH"
    }],
    rchristian: [{
        name: "Born Again",
        value: "CH0"
    }, {
        name: "Bretheren",
        value: "CH1"
    }, {
        name: "Church of South India",
        value: "CH2"
    }, {
        name: "Evangelist",
        value: "CH3"
    }, {
        name: "Jacobite",
        value: "CH4"
    }, {
        name: "Knanaya",
        value: "CH5"
    }, {
        name: "Malankara",
        value: "CH6"
    }, {
        name: "Marthoma",
        value: "CH7"
    }, {
        name: "Pentacost",
        value: "CH8"
    }, {
        name: "Roman catholic",
        value: "CH9"
    }, {
        name: "Syrian Catholic",
        value: "CH10"
    }, {
        name: "Other",
        value: "CHOTH"
    }],
    hobbies: [{
        name: "3D printing",
        value: "HOBI0"
    }, {
        name: "amateur radio",
        value: "HOBI1"
    }, {
        name: "scrapbook",
        value: "HOBI2"
    }, {
        name: "Acting",
        value: "HOBI3"
    }, {
        name: "Baton twirling",
        value: "HOBI4"
    }, {
        name: "Board games",
        value: "HOBI5"
    }, {
        name: "Book restoration",
        value: "HOBI6"
    }, {
        name: "Cabaret",
        value: "HOBI7"
    }, {
        name: "Calligraphy",
        value: "HOBI8"
    }, {
        name: "Candle making",
        value: "HOBI9"
    }, {
        name: "Computer programming",
        value: "HOBI10"
    }, {
        name: "Coffee roasting",
        value: "HOBI11"
    }, {
        name: "Cooking",
        value: "HOBI12"
    }, {
        name: "Coloring",
        value: "HOBI13"
    }, {
        name: "Cosplaying",
        value: "HOBI14"
    }, {
        name: "Couponing",
        value: "HOBI15"
    }, {
        name: "Creative writing",
        value: "HOBI16"
    }, {
        name: "Crocheting",
        value: "HOBI17"
    }, {
        name: "Cryptography",
        value: "HOBI18"
    }, {
        name: "Dance",
        value: "HOBI19"
    }, {
        name: "Digital arts",
        value: "HOBI20"
    }, {
        name: "Drama",
        value: "HOBI21"
    }, {
        name: "Drawing",
        value: "HOBI22"
    }, {
        name: "Do it yourself",
        value: "HOBI23"
    }, {
        name: "Electronics",
        value: "HOBI24"
    }, {
        name: "Embroidery",
        value: "HOBI25"
    }, {
        name: "Fashion",
        value: "HOBI26"
    }, {
        name: "Flower arranging",
        value: "HOBI27"
    }, {
        name: "Foreign language learning",
        value: "HOBI28"
    }, {
        name: "Gaming",
        value: "HOBI29"
    }, {
        name: "tabletop games",
        value: "HOBI30"
    }, {
        name: "role-playing games",
        value: "HOBI31"
    }, {
        name: "Gambling",
        value: "HOBI32"
    }, {
        name: "Genealogy",
        value: "HOBI33"
    }, {
        name: "Glassblowing",
        value: "HOBI34"
    }, {
        name: "Gunsmithing",
        value: "HOBI35"
    }, {
        name: "Homebrewing",
        value: "HOBI36"
    }, {
        name: "Ice skating",
        value: "HOBI37"
    }, {
        name: "Jewelry making",
        value: "HOBI38"
    }, {
        name: "Jigsaw puzzles",
        value: "HOBI39"
    }, {
        name: "Juggling",
        value: "HOBI40"
    }, {
        name: "Knapping",
        value: "HOBI41"
    }, {
        name: "Knitting",
        value: "HOBI42"
    }, {
        name: "Kabaddi",
        value: "HOBI43"
    }, {
        name: "Knife making",
        value: "HOBI44"
    }, {
        name: "Lacemaking",
        value: "HOBI45"
    }, {
        name: "Lapidary",
        value: "HOBI46"
    }, {
        name: "Leather crafting",
        value: "HOBI47"
    }, {
        name: "Lego building",
        value: "HOBI48"
    }, {
        name: "Lockpicking",
        value: "HOBI49"
    }, {
        name: "Machining",
        value: "HOBI50"
    }, {
        name: "Macrame",
        value: "HOBI51"
    }, {
        name: "Metalworking",
        value: "HOBI52"
    }, {
        name: "Magic",
        value: "HOBI53"
    }, {
        name: "Model building",
        value: "HOBI54"
    }, {
        name: "Listening to music",
        value: "HOBI55"
    }, {
        name: "Origami",
        value: "HOBI56"
    }, {
        name: "Painting",
        value: "HOBI57"
    }, {
        name: "Playing musical instruments",
        value: "HOBI58"
    }, {
        name: "Pet",
        value: "HOBI59"
    }, {
        name: "Poi",
        value: "HOBI60"
    }, {
        name: "Pottery",
        value: "HOBI61"
    }, {
        name: "Puzzles",
        value: "HOBI62"
    }, {
        name: "Quilting",
        value: "HOBI63"
    }, {
        name: "Reading",
        value: "HOBI64"
    }, {
        name: "Scrapbooking",
        value: "HOBI65"
    }, {
        name: "Sculpting",
        value: "HOBI66"
    }, {
        name: "Sewing",
        value: "HOBI67"
    }, {
        name: "Singing",
        value: "HOBI68"
    }, {
        name: "Sketching",
        value: "HOBI69"
    }, {
        name: "Soapmaking",
        value: "HOBI70"
    }, {
        name: "Sports",
        value: "HOBI71"
    }, {
        name: "Stand-up comedy",
        value: "HOBI72"
    }, {
        name: "Sudoku",
        value: "HOBI73"
    }, {
        name: "Table tennis",
        value: "HOBI74"
    }, {
        name: "Taxidermy",
        value: "HOBI75"
    }, {
        name: "Travelling",
        value: "HOBI76"
    }, {
        name: "Video gaming",
        value: "HOBI77"
    }, {
        name: "Watching movies",
        value: "HOBI78"
    }, {
        name: "Web surfing",
        value: "HOBI79"
    }, {
        name: "Whittling",
        value: "HOBI80"
    }, {
        name: "Wood carving",
        value: "HOBI81"
    }, {
        name: "Woodworking",
        value: "HOBI82"
    }, {
        name: "Worldbuilding",
        value: "HOBI83"
    }, {
        name: "Writing",
        value: "HOBI84"
    }, {
        name: "Yoga",
        value: "HOBI85"
    }, {
        name: "Yo-yoing",
        value: "HOBI86"
    }, {
        name: "Air sports",
        value: "HOBI87"
    }, {
        name: "Archery",
        value: "HOBI88"
    }, {
        name: "Astronomy",
        value: "HOBI89"
    }, {
        name: "Backpacking",
        value: "HOBI90"
    }, {
        name: "BASE jumping",
        value: "HOBI91"
    }, {
        name: "Baseball",
        value: "HOBI92"
    }, {
        name: "Basketball",
        value: "HOBI93"
    }, {
        name: "Beekeeping",
        value: "HOBI94"
    }, {
        name: "Bird watching",
        value: "HOBI95"
    }, {
        name: "Blacksmithing",
        value: "HOBI96"
    }, {
        name: "Board sports",
        value: "HOBI97"
    }, {
        name: "Bodybuilding",
        value: "HOBI98"
    }, {
        name: "Brazilian jiu-jitsu",
        value: "HOBI99"
    }, {
        name: "Community",
        value: "HOBI100"
    }, {
        name: "Cycling",
        value: "HOBI101"
    }, {
        name: "Dowsing",
        value: "HOBI102"
    }, {
        name: "Driving",
        value: "HOBI103"
    }, {
        name: "Fishing",
        value: "HOBI104"
    }, {
        name: "Flag Football",
        value: "HOBI105"
    }, {
        name: "Flying",
        value: "HOBI106"
    }, {
        name: "Flying disc",
        value: "HOBI107"
    }, {
        name: "Foraging",
        value: "HOBI108"
    }, {
        name: "Gardening",
        value: "HOBI109"
    }, {
        name: "Geocaching",
        value: "HOBI110"
    }, {
        name: "Ghost hunting",
        value: "HOBI111"
    }, {
        name: "Graffiti",
        value: "HOBI112"
    }, {
        name: "Handball",
        value: "HOBI113"
    }, {
        name: "Hiking",
        value: "HOBI114"
    }, {
        name: "Hooping",
        value: "HOBI115"
    }, {
        name: "Horseback riding",
        value: "HOBI116"
    }, {
        name: "Hunting",
        value: "HOBI117"
    }, {
        name: "Inline skating",
        value: "HOBI118"
    }, {
        name: "Jogging",
        value: "HOBI119"
    }, {
        name: "Kayaking",
        value: "HOBI120"
    }, {
        name: "Kite flying",
        value: "HOBI121"
    }, {
        name: "Kitesurfing",
        value: "HOBI122"
    }, {
        name: "LARPing",
        value: "HOBI123"
    }, {
        name: "Letterboxing",
        value: "HOBI124"
    }, {
        name: "Metal detecting",
        value: "HOBI125"
    }, {
        name: "Motor sports",
        value: "HOBI126"
    }, {
        name: "Mountain biking",
        value: "HOBI127"
    }, {
        name: "Mountaineering",
        value: "HOBI128"
    }, {
        name: "Mushroom hunting",
        value: "HOBI129"
    }, {
        name: "Mycology",
        value: "HOBI130"
    }, {
        name: "Netball",
        value: "HOBI131"
    }, {
        name: "Nordic skating",
        value: "HOBI132"
    }, {
        name: "Orienteering",
        value: "HOBI133"
    }, {
        name: "Paintball",
        value: "HOBI134"
    }, {
        name: "Parkour",
        value: "HOBI135"
    }, {
        name: "Photography",
        value: "HOBI136"
    }, {
        name: "Polo",
        value: "HOBI137"
    }, {
        name: "Rafting",
        value: "HOBI138"
    }, {
        name: "Rappelling",
        value: "HOBI139"
    }, {
        name: "Rock climbing",
        value: "HOBI140"
    }, {
        name: "Roller skating",
        value: "HOBI141"
    }, {
        name: "Rugby",
        value: "HOBI142"
    }, {
        name: "Running",
        value: "HOBI143"
    }, {
        name: "Sailing",
        value: "HOBI144"
    }, {
        name: "Sand art",
        value: "HOBI145"
    }, {
        name: "Scouting",
        value: "HOBI146"
    }, {
        name: "Scuba diving",
        value: "HOBI147"
    }, {
        name: "Sculling",
        value: "HOBI148"
    }, {
        name: "Rowing",
        value: "HOBI149"
    }, {
        name: "Shooting",
        value: "HOBI150"
    }, {
        name: "Shopping",
        value: "HOBI151"
    }, {
        name: "Skateboarding",
        value: "HOBI152"
    }, {
        name: "Skiing",
        value: "HOBI153"
    }, {
        name: "Skimboarding",
        value: "HOBI154"
    }, {
        name: "Skydiving",
        value: "HOBI155"
    }, {
        name: "Slacklining",
        value: "HOBI156"
    }, {
        name: "Snowboarding",
        value: "HOBI157"
    }, {
        name: "Stone skipping",
        value: "HOBI158"
    }, {
        name: "Surfing",
        value: "HOBI159"
    }, {
        name: "Swimming",
        value: "HOBI160"
    }, {
        name: "Taekwondo",
        value: "HOBI161"
    }, {
        name: "Tai chi",
        value: "HOBI162"
    }, {
        name: "Urban exploration",
        value: "HOBI163"
    }, {
        name: "Vacation",
        value: "HOBI164"
    }, {
        name: "Vehicle restoration",
        value: "HOBI165"
    }, {
        name: "Water sports",
        value: "HOBI166"
    }],
    zodiac: [{
        name: "Aries",
        value: "ZOD0"
    }, {
        name: "Taurus",
        value: "ZOD1"
    }, {
        name: "Gemini",
        value: "ZOD2"
    }, {
        name: "Cancer",
        value: "ZOD3"
    }, {
        name: "Leo",
        value: "ZOD4"
    }, {
        name: "Virgo",
        value: "ZOD5"
    }, {
        name: "Libra",
        value: "ZOD6"
    }, {
        name: "Scorpio",
        value: "ZOD7"
    }, {
        name: "Sagittarius",
        value: "ZOD8"
    }, {
        name: "Capricorn",
        value: "ZOD9"
    }, {
        name: "Aquarius",
        value: "ZOD10"
    }, {
        name: "Pisces",
        value: "ZOD11"
    }],
    countriesWithCode: {
        Afghanistan: "+93",
        Albania: "+355",
        Algeria: "+213",
        "American Samoa": "+684",
        Andorra: "+376",
        Angola: "+244",
        Anguilla: "+264",
        Antarctica: "+672",
        "Antigua and Barbuda": "+268",
        Argentina: "+54",
        Armenia: "+374",
        Aruba: "+297",
        Australia: "+61",
        Austria: "+43",
        Azerbaijan: "+994",
        Bahamas: "+242",
        Bahrain: "+973",
        Bangladesh: "+880",
        Barbados: "+246",
        Belarus: "+375",
        Belgium: "+32",
        Belize: "+501",
        Benin: "+229",
        Bermuda: "+441",
        Bhutan: "+975",
        "Bolivia, Plurinational State of": "+591",
        "Bonaire, Sint Eustatius and Saba": "+599",
        "Bosnia and Herzegovina": "+387",
        Botswana: "+267",
        "Bouvet Island": "+47",
        Brazil: "+55",
        "British Indian Ocean Territory": "+246",
        "Brunei Darussalam": "+673",
        Bulgaria: "+359",
        "Burkina Faso": "+226",
        Burundi: "+257",
        Cambodia: "+855",
        Cameroon: "+237",
        Canada: "+1",
        "Cape Verde": "+238",
        "Cayman Islands": "+345",
        "Central African Republic": "+236",
        Chad: "+235",
        Chile: "+56",
        China: "+86",
        "Christmas Island": "+61",
        "Cocos (Keeling) Islands": "+891",
        Colombia: "+57",
        Comoros: "+269",
        Congo: "+242",
        "Congo, the Democratic Republic of the": "+243",
        "Cook Islands": "+682",
        "Costa Rica": "+506",
        Croatia: "+385",
        Cuba: "+53",
        "Curaçao": "+599",
        Cyprus: "+357",
        "Czech Republic": "+420",
        Denmark: "+45",
        Djibouti: "+253",
        Dominica: "+767",
        "Dominican Republic": "+809",
        Ecuador: "+593",
        Egypt: "+20",
        "El Salvador": "+503",
        "Equatorial Guinea": "+240",
        Eritrea: "+291",
        Estonia: "+372",
        Ethiopia: "+251",
        "Falkland Islands (Malvinas)": "+500",
        "Faroe Islands": "+298",
        Fiji: "+679",
        Finland: "+358",
        France: "+33",
        "French Guiana": "+594",
        "French Polynesia": "+689",
        "French Southern Territories": "+689",
        Gabon: "+241",
        Gambia: "+220",
        Georgia: "+995",
        Germany: "+49",
        Ghana: "+233",
        Gibraltar: "+350",
        Greece: "+30",
        Greenland: "+299",
        Grenada: "+473",
        Guadeloupe: "+590",
        Guam: "+671",
        Guatemala: "+502",
        Guernsey: "+1481",
        Guinea: "+225",
        "Guinea-Bissau": "+245",
        Guyana: "+592",
        Haiti: "+509",
        "Heard Island and McDonald Islands": "+61",
        "Holy See (Vatican City State)": "+379",
        Honduras: "+504",
        "Hong Kong": "+852",
        Hungary: "+36",
        Iceland: "+354",
        India: "+91",
        Indonesia: "+62",
        "Iran, Islamic Republic of": "+98",
        Iraq: "+964",
        Ireland: "+353",
        "Isle of Man": "+44",
        Israel: "+972",
        Italy: "+39",
        Jamaica: "+876",
        Japan: "+81",
        Jersey: "+44",
        Jordan: "+962",
        Kazakhstan: "+7",
        Kenya: "+254",
        Kiribati: "+686",
        "Korea, Republic of": "+82",
        Kuwait: "+965",
        Kyrgyzstan: "+996",
        Latvia: "+371",
        Lebanon: "+961",
        Lesotho: "+266",
        Liberia: "+231",
        Libya: "+218",
        Liechtenstein: "+423",
        Lithuania: "+370",
        Luxembourg: "+352",
        Macao: "+853",
        "Macedonia, The Former Yugoslav Republic of": "+389",
        Madagascar: "+261",
        Malawi: "+265",
        Malaysia: "+60",
        Maldives: "+960",
        Mali: "+223",
        Malta: "+356",
        "Marshall Islands": "+692",
        Martinique: "+596",
        Mauritania: "+222",
        Mauritius: "+230",
        Mayotte: "+262",
        Mexico: "+52",
        "Micronesia, Federated States of": "+691",
        "Moldova, Republic of": "+373",
        Monaco: "+355",
        Mongolia: "+976",
        Montenegro: "+382",
        Montserrat: "+664",
        Morocco: "+212",
        Mozambique: "+258",
        Myanmar: "+95",
        Namibia: "+264",
        Nauru: "+674",
        Nepal: "+977",
        Netherlands: "+31",
        "New Caledonia": "+687",
        "New Zealand": "+64",
        Nicaragua: "+505",
        Niger: "+277",
        Nigeria: "+234",
        Niue: "+683",
        "Norfolk Island": "+672",
        "Northern Mariana Islands": "+670",
        Norway: "+47",
        Oman: "+968",
        Pakistan: "+92",
        Palau: "+680",
        "Palestinian Territory, Occupied": "+970",
        Panama: "+507",
        "Papua New Guinea": "+675",
        Paraguay: "+595",
        Peru: "+51",
        Philippines: "+63",
        Pitcairn: "+872",
        Poland: "+48",
        Portugal: "+351",
        "Puerto Rico": "+787",
        Qatar: "+974",
        Romania: "+40",
        "Russian Federation": "+7",
        Rwanda: "+250",
        "Réunion": "+262",
        "Saint Barthélemy": "+590",
        "Saint Helena, Ascension and Tristan da Cunha": "+290",
        "Saint Kitts and Nevis": "+869",
        "Saint Lucia": "+758",
        "Saint Martin (French part)": "+590",
        "Saint Pierre and Miquelon": "+508",
        "Saint Vincent and the Grenadines": "+784",
        Samoa: "+685",
        "San Marino": "+378",
        "Sao Tome and Principe": "+239",
        "Saudi Arabia": "+966",
        Senegal: "+221",
        Serbia: "+381",
        Seychelles: "+248",
        "Sierra Leone": "+232",
        Singapore: "+65",
        "Sint Maarten (Dutch part)": "+599",
        Slovakia: "+421",
        Slovenia: "+386",
        "Solomon Islands": "+677",
        Somalia: "+252",
        "South Africa": "+27",
        "South Georgia and the South Sandwich Islands": "+500",
        "South Sudan": "+211",
        Spain: "+34",
        "Sri Lanka": "+94",
        Sudan: "+249",
        Suriname: "+597",
        "Svalbard and Jan Mayen": "+47",
        Swaziland: "+268",
        Sweden: "+46",
        Switzerland: "+41",
        "Syrian Arab Republic": "+963",
        "Taiwan, Province of China": "+886",
        Tajikistan: "+992",
        "Tanzania, United Republic of": "+255",
        Thailand: "+66",
        "Timor-Leste": "+670",
        Togo: "+228",
        Tokelau: "+690",
        Tonga: "+676",
        "Trinidad and Tobago": "+868",
        Tunisia: "+216",
        Turkey: "+90",
        Turkmenistan: "+993",
        "Turks and Caicos Islands": "+649",
        Tuvalu: "+688",
        Uganda: "+256",
        Ukraine: "+380",
        "United Arab Emirates": "+971",
        "United Kingdom": "+44",
        "United States": "+1",
        Uruguay: "+598",
        Uzbekistan: "+998",
        Vanuatu: "+678",
        "Venezuela, Bolivarian Republic of": "+58",
        "Viet Nam": "+84",
        "Virgin Islands, British": "+284",
        "Virgin Islands, U.S.": "+340",
        "Wallis and Futuna": "+681",
        "Western Sahara": "+212",
        Yemen: "+967",
        Zambia: "+260",
        Zimbabwe: "+263",
        "Åland Islands": "+358"
    },
    mother_tongues: [{
        name: "Afrikanns",
        value: "AF"
    }, {
        name: "Albanian",
        value: "SQ"
    }, {
        name: "Arabic",
        value: "AR"
    }, {
        name: "Armenian",
        value: "HY"
    }, {
        name: "Basque",
        value: "EU"
    }, {
        name: "Bengali",
        value: "BN"
    }, {
        name: "Bulgarian",
        value: "BG"
    }, {
        name: "Catalan",
        value: "CA"
    }, {
        name: "Cambodian",
        value: "KM"
    }, {
        name: "Chinese (Mandarin)",
        value: "ZH"
    }, {
        name: "Croation",
        value: "HR"
    }, {
        name: "Czech",
        value: "CS"
    }, {
        name: "Danish",
        value: "DA"
    }, {
        name: "Dutch",
        value: "NL"
    }, {
        name: "English",
        value: "EN"
    }, {
        name: "Estonian",
        value: "ET"
    }, {
        name: "Fiji",
        value: "FJ"
    }, {
        name: "Finnish",
        value: "FI"
    }, {
        name: "French",
        value: "FR"
    }, {
        name: "Georgian",
        value: "KA"
    }, {
        name: "German",
        value: "DE"
    }, {
        name: "Greek",
        value: "EL"
    }, {
        name: "Gujarati",
        value: "GU"
    }, {
        name: "Hebrew",
        value: "HE"
    }, {
        name: "Hindi",
        value: "HI"
    }, {
        name: "Hungarian",
        value: "HU"
    }, {
        name: "Icelandic",
        value: "IS"
    }, {
        name: "Indonesian",
        value: "ID"
    }, {
        name: "Irish",
        value: "GA"
    }, {
        name: "Italian",
        value: "IT"
    }, {
        name: "Japanese",
        value: "JA"
    }, {
        name: "Javanese",
        value: "JW"
    }, {
        name: "Korean",
        value: "KO"
    }, {
        name: "Latin",
        value: "LA"
    }, {
        name: "Latvian",
        value: "LV"
    }, {
        name: "Lithuanian",
        value: "LT"
    }, {
        name: "Macedonian",
        value: "MK"
    }, {
        name: "Malay",
        value: "MS"
    }, {
        name: "Malayalam",
        value: "ML"
    }, {
        name: "Maltese",
        value: "MT"
    }, {
        name: "Maori",
        value: "MI"
    }, {
        name: "Marathi",
        value: "MR"
    }, {
        name: "Mongolian",
        value: "MN"
    }, {
        name: "Nepali",
        value: "NE"
    }, {
        name: "Norwegian",
        value: "NO"
    }, {
        name: "Persian",
        value: "FA"
    }, {
        name: "Polish",
        value: "PL"
    }, {
        name: "Portuguese",
        value: "PT"
    }, {
        name: "Punjabi",
        value: "PA"
    }, {
        name: "Quechua",
        value: "QU"
    }, {
        name: "Romanian",
        value: "RO"
    }, {
        name: "Russian",
        value: "RU"
    }, {
        name: "Samoan",
        value: "SM"
    }, {
        name: "Serbian",
        value: "SR"
    }, {
        name: "Slovak",
        value: "SK"
    }, {
        name: "Slovenian",
        value: "SL"
    }, {
        name: "Spanish",
        value: "ES"
    }, {
        name: "Swahili",
        value: "SW"
    }, {
        name: "Swedish ",
        value: "SV"
    }, {
        name: "Tamil",
        value: "TA"
    }, {
        name: "Tatar",
        value: "TT"
    }, {
        name: "Telugu",
        value: "TE"
    }, {
        name: "Thai",
        value: "TH"
    }, {
        name: "Tibetan",
        value: "BO"
    }, {
        name: "Tonga",
        value: "TO"
    }, {
        name: "Turkish",
        value: "TR"
    }, {
        name: "Ukranian",
        value: "UK"
    }, {
        name: "Urdu",
        value: "UR"
    }, {
        name: "Uzbek",
        value: "UZ"
    }, {
        name: "Vietnamese",
        value: "VI"
    }, {
        name: "Welsh",
        value: "CY"
    }, {
        name: "Xhosa",
        value: "XH"
    }],
    religions: [{
        name: "African Traditional",
        value: "AFT"
    }, {
        name: "Agnostic",
        value: "AGN"
    }, {
        name: "Atheist",
        value: "ATH"
    }, {
        name: "Baha'i",
        value: "BAHI"
    }, {
        name: "Buddhism",
        value: "BUDH"
    }, {
        name: "Cao Dai",
        value: "CAD"
    }, {
        name: "Chinese",
        value: "CTR"
    }, {
        name: "Christianity",
        value: "CHR"
    }, {
        name: "Hinduism",
        value: "HINDU"
    }, {
        name: "Islam",
        value: "ISLAM"
    }, {
        name: "Jainism",
        value: "JAIN"
    }, {
        name: "Juche",
        value: "JUCHE"
    }, {
        name: "Judaism",
        value: "JUD"
    }, {
        name: "Neo-Paganism",
        value: "NEOP"
    }, {
        name: "Nonreligious",
        value: "NOR"
    }, {
        name: "Rastafarianism",
        value: "RASF"
    }, {
        name: "Secular",
        value: "SECL"
    }, {
        name: "Shinto",
        value: "SHIN"
    }, {
        name: "Sikhism",
        value: "SIKH"
    }, {
        name: "Spiritism",
        value: "SPIR"
    }, {
        name: "Tenrikyo",
        value: "TEN"
    }, {
        name: "Unitarian-Universalism",
        value: "UNIU"
    }, {
        name: "Zoroastrianism",
        value: "ZORO"
    }, {
        name: "primal-indigenous",
        value: "PRIN"
    }, {
        name: "Other",
        value: "OTH"
    }],
    educations: [{
        groupname: "--Arts/Science--",
        parskey: "eduartsci",
        grupitems: [{
            name: "B.A",
            value: "EDUASBA"
        }, {
            name: "B.Sc",
            value: "EDUASBSC"
        }, {
            name: "M.A",
            value: "EDUASMA"
        }, {
            name: "M.Sc",
            value: "EDUASMSC"
        }, {
            name: "B.Ed",
            value: "EDUASBED"
        }, {
            name: "M.Ed",
            value: "EDUASMED"
        }]
    }, {
        groupname: "--Computers & Engineering--",
        parskey: "educe",
        grupitems: [{
            name: "MCA/PGDCA",
            value: "EDUCEMCAPG"
        }, {
            name: "BCA",
            value: "EDUCEBCA"
        }, {
            name: "B.IT",
            value: "EDUCEBIT"
        }, {
            name: "B.ENGINEERING / B.TECHNOLOGY",
            value: "EDUCEBEBT"
        }, {
            name: "B.Pharmacy",
            value: "EDUCOMENGBPHAR"
        }, {
            name: "M.ENGINEERING / M.TECHNOLOGY",
            value: "EDUCEMEMT"
        }, {
            name: "M.Pharmacy",
            value: "EDUCEMPHAR"
        }, {
            name: "M.S",
            value: "EDUCEMS"
        }, {
            name: "B.ARCHITECTURE",
            value: "EDUCEBAR"
        }, {
            name: "M.ARCHITECTURE",
            value: "EDUCEMAR"
        }]
    }, {
        groupname: "--Doctorate & Medicine--",
        parskey: "edudm",
        grupitems: [{
            name: "BAMS",
            value: "EDUDMBAMS"
        }, {
            name: "BDS",
            value: "EDUDMBDS"
        }, {
            name: "BHMS",
            value: "EDUDMBHMS"
        }, {
            name: "BPT",
            value: "EDUDMBPT"
        }, {
            name: "B.Pharmacy",
            value: "EDUDMBPH"
        }, {
            name: "B.Sc.Nursing",
            value: "EDUDMBSCN"
        }, {
            name: "BSMS",
            value: "EDUDMBSMS"
        }, {
            name: "BUMS",
            value: "EDUDMBUMS"
        }, {
            name: "BVSc.",
            value: "EDUDMBVSC"
        }, {
            name: "MBBS",
            value: "EDUDMMBBS"
        }, {
            name: "M.D",
            value: "EDUDMMD"
        }, {
            name: "MDS",
            value: "EDUDMMDS"
        }, {
            name: "M.Pharmacy",
            value: "EDUDMMPH"
        }, {
            name: "MPT",
            value: "EDUDMMPT"
        }, {
            name: "M.S (Medicine)",
            value: "EDUDMMS"
        }, {
            name: "MVSc.",
            value: "EDUDMMVSC"
        }, {
            name: "Ph.D",
            value: "EDUDMPHD"
        }, {
            name: "M.Phil",
            value: "EDUDMMPHIL"
        }]
    }, {
        groupname: "--Finance / Commerce--",
        parskey: "edufincom",
        grupitems: [{
            name: "B.COMMERCE",
            value: "EDUFCBCOM"
        }, {
            name: "CA",
            value: "EDUFCCA"
        }, {
            name: "CS",
            value: "EDUFCCS"
        }, {
            name: "ICWA",
            value: "EDUFCICWA"
        }, {
            name: "M.COMMERCE",
            value: "EDUFCMCOM"
        }, {
            name: "CFA",
            value: "EDUFCCFA"
        }]
    }, {
        groupname: "--Law & Management--",
        parskey: "edulawman",
        grupitems: [{
            name: "BL / LLB",
            value: "EDULAWMANBLB"
        }, {
            name: "ML / LLM",
            value: "EDULAWMANMLM"
        }, {
            name: "BBA",
            value: "EDULAWMANBBA"
        }, {
            name: "BFM (Financial Management)",
            value: "EDULAWMANBFM"
        }, {
            name: "BHM (Hotel Management)",
            value: "EDULAWMANBHM"
        }, {
            name: "MBA/PGDM",
            value: "EDULAWMANMP"
        }, {
            name: "MFM (Financial Management)",
            value: "EDULAWMANMFM"
        }, {
            name: "MHM(Hotel Management)",
            value: "EDULAWMANMHM"
        }, {
            name: "MHRM (Human Resource Management)",
            value: "EDULAWMANMHRM"
        }]
    }, {
        groupname: "--Non Graduate & Others--",
        parskey: "edungot",
        grupitems: [{
            name: "Diploma",
            value: "EDUNGOTDIP"
        }, {
            name: "Higher Secondary School",
            value: "EDUNGOTHSS"
        }, {
            name: "High School",
            value: "EDUNGOTHS"
        }, {
            name: "Polytechnic",
            value: "EDUNGOTP"
        }, {
            name: "Trade School",
            value: "EDUNGOTTS"
        }, {
            name: "Aviation Degree",
            value: "EDUNGOTAD"
        }, {
            name: "BFA",
            value: "EDUNGOTBFA"
        }, {
            name: "BFT",
            value: "EDUNGOTBFT"
        }, {
            name: "BLIS",
            value: "EDUNGOTBLIS"
        }, {
            name: "B.M.M",
            value: "EDUNGOTBMM"
        }, {
            name: "B.Plan",
            value: "EDUNGOTBP"
        }, {
            name: "B.S.W",
            value: "EDUNGOTBSW"
        }, {
            name: "MLIS",
            value: "EDUNGOTMLIS"
        }, {
            name: "MSW",
            value: "EDUNGOTMSW"
        }, {
            name: "Other",
            value: "EDUNGOTOT"
        }]
    }],
    studies: [{
        name: "Agriculture",
        value: "AG"
    }, {
        name: "Automobile",
        value: "AU"
    }, {
        name: "Aviation",
        value: "AV"
    }, {
        name: "Bio-Chemistry/Bio-Technology",
        value: "BIOC"
    }, {
        name: "Biomedical",
        value: "BIOD"
    }, {
        name: "Ceramics",
        value: "CER"
    }, {
        name: "Chemical",
        value: "CHEM"
    }, {
        name: "Civil",
        value: "CIVIL"
    }, {
        name: "Computers",
        value: "COM"
    }, {
        name: "Electrical",
        value: "ELC"
    }, {
        name: "Electronics/Telecommunication",
        value: "ELCT"
    }, {
        name: "Energy",
        value: "ENG"
    }, {
        name: "Environmental",
        value: "ENV"
    }, {
        name: "Instrumentation",
        value: "INS"
    }, {
        name: "Marine",
        value: "MARINE"
    }, {
        name: "Mechanical",
        value: "MCH"
    }, {
        name: "Metallurgy",
        value: "MET"
    }, {
        name: "Mineral",
        value: "MIN"
    }, {
        name: "Mining",
        value: "MINI"
    }, {
        name: "Nuclear",
        value: "NUC"
    }, {
        name: "Paint/Oil",
        value: "PAINT"
    }, {
        name: "Petroleum",
        value: "PETRO"
    }, {
        name: "Plastics",
        value: "PLASTIC"
    }, {
        name: "Production/Industrial",
        value: "PROUD"
    }, {
        name: "Textile",
        value: "TEXTILE"
    }, {
        name: "Other Engineering",
        value: "OTHE"
    }, {
        name: "Other",
        value: "OTH"
    }],
    MaritialStatus: [{
        name: "Single",
        value: "SINGLE"
    }, {
        name: "Awaiting Divorse",
        value: "AWDIVORSE"
    }, {
        name: "Divorsed",
        value: "DIVORSED"
    }, {
        name: "Gol Dhana Folk",
        value: "GDF"
    }, {
        name: "Widowed",
        value: "WIDOW"
    }, {
        name: "Annulled",
        value: "ANNULLED"
    }],
    complexion: [{
        name: "Dark",
        value: "DARK"
    }, {
        name: "Fair",
        value: "FAIR"
    }, {
        name: "Wheatish",
        value: "WHEATISH"
    }, {
        name: "Wheatish Brown",
        value: "WHEATISHBR"
    }, {
        name: "Very Fair",
        value: "VFAIR"
    }],
    BodyType: [{
        name: "Athletic",
        value: "ATHLETIC"
    }, {
        name: "Average",
        value: "AVERAGE"
    }, {
        name: "Heavy",
        value: "MUSCULAR"
    }, {
        name: "Slim",
        value: "SLIM"
    }],
    PhysicalStatus: [{
        name: "Normal",
        value: "NOR"
    }, {
        name: "Physically challenged",
        value: "PC"
    }],
    fatheroccupation: [{
        groupname: "--Father Occupation--",
        parskey: "focc",
        grupitems: [{
            name: "Army/Armed Forces",
            value: "FOCCAAF"
        }, {
            name: "Business/Entrepreneur",
            value: "FOCCBUEN"
        }, {
            name: "Civil Services",
            value: "FOCCCS"
        }, {
            name: "Expired",
            value: "FOCCEXP"
        }, {
            name: "Retired",
            value: "FOCCRET"
        }, {
            name: "Service(Govt./ PSU)",
            value: "FOCCSEGP"
        }, {
            name: "Service(Private)",
            value: "FOCCSP"
        }]
    }],
    occupations: [{
        groupname: "--Administration--",
        parskey: "occadmin",
        grupitems: [{
            name: "Administrative Professional",
            value: "OCCADMAP"
        }, {
            name: "Clerk",
            value: "OCCACRK"
        }, {
            name: "Executive",
            value: "OCCADEXE"
        }, {
            name: "Human Resources Professional",
            value: "OCCADHRP"
        }, {
            name: "Manager",
            value: "OCCADHRM"
        }, {
            name: "Officer",
            value: "OCCADHRO"
        }, {
            name: "Supervisor",
            value: "OCCADHRS"
        }]
    }, {
        groupname: "--Agriculture & Hospitality--",
        parskey: "occagrihos",
        grupitems: [{
            name: "Agriculture & Farming Professional",
            value: "OCCAGRIHOSFAR"
        }, {
            name: "Hospitality / Hotel Professional ",
            value: "OCCAGRIHOSPHHP"
        }]
    }, {
        groupname: "--Airline & Defence--",
        parskey: "occairde",
        grupitems: [{
            name: "Airline Professional",
            value: "OCCAIRDEAP"
        }, {
            name: "Air Hostess",
            value: "OCCAIRDEAH"
        }, {
            name: "Pilot",
            value: "OCCAIRDEPI"
        }, {
            name: "Airforce",
            value: "OCCAIRDEFAIR"
        }, {
            name: "Army",
            value: "OCCAIRDEFAR"
        }, {
            name: "Navy",
            value: "OCCAIRDEFNAV"
        }]
    }, {
        groupname: "--Architect & Design--",
        parskey: "occarcdes",
        grupitems: [{
            name: "Architect",
            value: "OCCARCDESARC"
        }, {
            name: "Interior Designer",
            value: "OCCARCDESID"
        }]
    }, {
        groupname: "--Banking & Finance--",
        parskey: "occbafi",
        grupitems: [{
            name: "Accounts/Financial Professional",
            value: "OCCBAFIACFP"
        }, {
            name: "AUDITOR",
            value: "OCCBAFIAUD"
        }, {
            name: "Banking Service Professional",
            value: "OCCBAFIBSP"
        }, {
            name: "Chartered Accountant",
            value: "OCCBAFICA"
        }, {
            name: "Company Secretary",
            value: "OCCBAFICS"
        }, {
            name: "Financial Accountant",
            value: "OCCBAFIFIAC"
        }, {
            name: "Financial Analyst / Planning",
            value: "OCCBAFIFIAP"
        }]
    }, {
        groupname: "--Beauty & Fashion--",
        parskey: "occbf",
        grupitems: [{
            name: "Beautician",
            value: "OCCBFBEAU"
        }, {
            name: "Fashion Designer",
            value: "OCCBFFD"
        }, {
            name: "Fitness Professional",
            value: "OCCBFFP"
        }]
    }, {
        groupname: "--Civil Services & Education--",
        parskey: "occcsedu",
        grupitems: [{
            name: "IAS",
            value: "OCCCSEDUIAS"
        }, {
            name: "IES",
            value: "OCCCSEDUIES"
        }, {
            name: "IFS",
            value: "OCCCSEDUIFS"
        }, {
            name: "IPS",
            value: "OCCCSEDUIPS"
        }, {
            name: "IRS",
            value: "OCCCSEDUIRS"
        }, {
            name: "Academician/Teaching",
            value: "OCCCSEDUAT"
        }, {
            name: "Educational Professional",
            value: "OCCCSEDUEP"
        }, {
            name: "Professor / Lecturer",
            value: "OCCCSEDUPL"
        }, {
            name: "Teacher",
            value: "OCCCSEDUTE"
        }]
    }, {
        groupname: "--Enggneering & IT--",
        parskey: "occenit",
        grupitems: [{
            name: "Designer",
            value: "OCCENITDES"
        }, {
            name: "Engineer (Non IT)",
            value: "OCCENITENIT"
        }, {
            name: "Hardware Professional",
            value: "OCCENITHP"
        }, {
            name: "Software Professional",
            value: "OCCENITSP"
        }]
    }, {
        groupname: "--Legal & Law Enforcement--",
        parskey: "occlegle",
        grupitems: [{
            name: "Lawyer & Legal Professional",
            value: "OCCLEGLELLP"
        }, {
            name: "Law Enforcement Officer",
            value: "OCCLEGLELEO"
        }]
    }, {
        groupname: "--Medical & Merchant Navy--",
        parskey: "occmedmn",
        grupitems: [{
            name: "Doctor",
            value: "OCCMEDMNDOC"
        }, {
            name: "Health Care Professional",
            value: "OCCMEDMNHCP"
        }, {
            name: "Nurse",
            value: "OCCMEDMNNU"
        }, {
            name: "Paramedical Professional",
            value: "OCCMEDMNPP"
        }, {
            name: "Mariner / Merchant Navy",
            value: "OCCMEDMNMMN"
        }]
    }, {
        groupname: "--Marketing & Sales--",
        parskey: "occms",
        grupitems: [{
            name: "Marketing Professional",
            value: "OCCMSMP"
        }, {
            name: "Sales Professional",
            value: "OCCMSSP"
        }]
    }, {
        groupname: "--Media & Entertainment--",
        parskey: "occme",
        grupitems: [{
            name: "Advertising / PR Professional",
            value: "OCCMEAPRP"
        }, {
            name: "Designer",
            value: "OCCMEDES"
        }, {
            name: "Entertainment Professional",
            value: "OCCMEEP"
        }, {
            name: "Event Management Professional",
            value: "OCCMEEMP"
        }, {
            name: "Journalist",
            value: "OCCMEJOU"
        }, {
            name: "Media Professional",
            value: "OCCMEMEP"
        }]
    }, {
        groupname: "--Scientist & Top Management--",
        parskey: "occscitm",
        grupitems: [{
            name: "Researcher / Scientist",
            value: "OCCSCITMRS"
        }, {
            name: "CXO / President",
            value: "OCCSCITMCX"
        }, {
            name: "Chairman",
            value: "OCCSCITMCH"
        }, {
            name: "Director",
            value: "OCCSCITMDI"
        }, {
            name: "Business Analyst",
            value: "OCCSCITMBA"
        }]
    }, {
        groupname: "Others",
        parskey: "occoth",
        grupitems: [{
            name: "Arts & Craftsman",
            value: "OCCOTHAC"
        }, {
            name: "Business Owner",
            value: "OCCOTHBO"
        }, {
            name: "Consultant",
            value: "OCCOTHCO"
        }, {
            name: "Customer Care Professional",
            value: "OCCOTHCCP"
        }, {
            name: "Entrepreneur",
            value: "OCCOTHEN"
        }, {
            name: "Librarian",
            value: "OCCOTHLI"
        }, {
            name: "Not Working",
            value: "OCCOTHNW"
        }, {
            name: "Sportsman",
            value: "OCCOTHSP"
        }, {
            name: "NGO / Social Worker",
            value: "OCCOTHSW"
        }, {
            name: "Technician",
            value: "OCCOTHTE"
        }]
    }],
    Expectation: [{
        name: "Only from Mumbai",
        value: "ONM"
    }, {
        name: "Ready to relocate out of India",
        value: "RTRI"
    }, {
        name: "No criteria for place",
        value: "NCFP"
    }],
    Horoscope: [{
        name: "Clear",
        value: "CL"
    }, {
        name: "Light Mangal",
        value: "LM"
    }],
    aincome: [{
        name: "No Income",
        value: "N0INC"
    }, {
        name: "0-1 Lakhs",
        value: "0T1L"
    }, {
        name: "1-2 Lakhs",
        value: "1T2L"
    }, {
        name: "2-3 Lakhs",
        value: "2T3L"
    }, {
        name: "3-5 Lakhs",
        value: "3T5L"
    }, {
        name: "5-8 Lakhs",
        value: "5T8L"
    }, {
        name: "8-10 Lakhs",
        value: "8T10L"
    }, {
        name: "10-15 Lakhs",
        value: "10T15L"
    }, {
        name: "15-20 Lakhs",
        value: "15T20L"
    }, {
        name: "20-30 Lakhs",
        value: "20T30L"
    }, {
        name: "30-35 Lakhs",
        value: "30T35L"
    }, {
        name: "35-50 Lakhs",
        value: "35T50L"
    }, {
        name: "50-75 Lakhs",
        value: "50T75L"
    }, {
        name: "75 Lakhs-1 Crore",
        value: "75T1C"
    }, {
        name: "1 Crore & Above",
        value: "ABOVE1C"
    }]
};