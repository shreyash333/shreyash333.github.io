'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "9281bf23fd96f4762894bc90cbd61de7",
"assets/assets/fonts/Acme/Acme-Regular.ttf": "22b3170c9e556fd13a1eb8f012a5635d",
"assets/assets/fonts/Alice/aed87c38": "c91fff83336af5897d91fb4179cc5eff",
"assets/assets/fonts/Alice/Alice-Regular.ttf": "c91fff83336af5897d91fb4179cc5eff",
"assets/assets/fonts/Arbutus_Slab/43f9228d": "bc0feefc9882e95b277bc508e25efdda",
"assets/assets/fonts/Arbutus_Slab/ArbutusSlab-Regular.ttf": "bc0feefc9882e95b277bc508e25efdda",
"assets/assets/fonts/Balsamiq_Sans/BalsamiqSans-Bold.ttf": "ed3ff13e6453434370d0d0a9f4ebc734",
"assets/assets/fonts/Balsamiq_Sans/BalsamiqSans-BoldItalic.ttf": "f9176db3a423b5c5122b8609d2c28105",
"assets/assets/fonts/Balsamiq_Sans/BalsamiqSans-Italic.ttf": "99e0b3470cea314fa44425673c4f463f",
"assets/assets/fonts/Balsamiq_Sans/BalsamiqSans-Regular.ttf": "d0e0c9d174a9cec8f1383ebd7bf51b31",
"assets/assets/fonts/eczar/Eczar-Bold.ttf": "cc7ab72defdc20635c15ea53197c7574",
"assets/assets/fonts/eczar/Eczar-ExtraBold.ttf": "b618de1f36c064c749068dadd0c1b92b",
"assets/assets/fonts/eczar/Eczar-Medium.ttf": "8550fe6d41b58faadd709b34786cbbaf",
"assets/assets/fonts/eczar/Eczar-Regular.ttf": "f3ff4145641c976a380e1d57699470bd",
"assets/assets/fonts/eczar/Eczar-SemiBold.ttf": "b335d37ba203401eef13055a702383ef",
"assets/assets/fonts/Italianno/Italianno-Regular.ttf": "955339581e5518ea89508935946106f8",
"assets/assets/fonts/karla/Karla-Bold.ttf": "d96c62b04ef8906e0840fa8bfc594689",
"assets/assets/fonts/karla/Karla-ExtraBold.ttf": "2e7b53dd408229767dd2b6b3d1ce52f8",
"assets/assets/fonts/karla/Karla-ExtraLight.ttf": "0290f163028cf488c8e855e20813927f",
"assets/assets/fonts/karla/Karla-Light.ttf": "5c688f71eefb5497bcfd2fa05501c341",
"assets/assets/fonts/karla/Karla-Medium.ttf": "25e5fb043c553428b0ff57a4c23693f0",
"assets/assets/fonts/karla/Karla-Regular.ttf": "b080309c5814be4e7818e86fe2d57715",
"assets/assets/fonts/Lato/Lato-Black.ttf": "e631d2735799aa943d93d301abf423d2",
"assets/assets/fonts/Lato/Lato-BlackItalic.ttf": "2e26a9163cb4974dcba1bea5107d4492",
"assets/assets/fonts/Lato/Lato-Bold.ttf": "85d339d916479f729938d2911b85bf1f",
"assets/assets/fonts/Lato/Lato-BoldItalic.ttf": "f98d18040a766b7bc4884b8fcc154550",
"assets/assets/fonts/Lato/Lato-Italic.ttf": "7582e823ef0d702969ea0cce9afb326d",
"assets/assets/fonts/Lato/Lato-Light.ttf": "2fe27d9d10cdfccb1baef28a45d5ba90",
"assets/assets/fonts/Lato/Lato-LightItalic.ttf": "4d80ac573c53d192dafd99fdd6aa01e9",
"assets/assets/fonts/Lato/Lato-Regular.ttf": "2d36b1a925432bae7f3c53a340868c6e",
"assets/assets/fonts/Lato/Lato-Thin.ttf": "9a77fbaa85fa42b73e3b96399daf49c5",
"assets/assets/fonts/Lato/Lato-ThinItalic.ttf": "4ac7208bbe0e3593ce9464f013607751",
"assets/assets/fonts/librefranklin/b65ac3a1": "bd928b12f253c87ff0d03aff116f3fc6",
"assets/assets/fonts/librefranklin/ef2f4f37": "2dc7fdc8fbaaedb83b516fbd0efb22e1",
"assets/assets/fonts/librefranklin/LibreFranklin-Black.ttf": "fb10c26aef86092454b93d61444d7ab3",
"assets/assets/fonts/librefranklin/LibreFranklin-BlackItalic.ttf": "275cfc7373ffe4a276d4944282171cef",
"assets/assets/fonts/librefranklin/LibreFranklin-Bold.ttf": "566f20650f1815bd25f7e389e49c2f34",
"assets/assets/fonts/librefranklin/LibreFranklin-BoldItalic.ttf": "423b3ce37da7861a3f311ca4279d2392",
"assets/assets/fonts/librefranklin/LibreFranklin-ExtraBold.ttf": "d8d345796001576d60cf46005b7c84fe",
"assets/assets/fonts/librefranklin/LibreFranklin-ExtraBoldItalic.ttf": "46d17e0fe8f1edcc26c67ad2f5dae702",
"assets/assets/fonts/librefranklin/LibreFranklin-ExtraLight.ttf": "5dabad33db75cf51bda860ae1760aacb",
"assets/assets/fonts/librefranklin/LibreFranklin-ExtraLightItalic.ttf": "17f95b5847021428a679e0034445be96",
"assets/assets/fonts/librefranklin/LibreFranklin-Italic.ttf": "21ed6c0aa96948cf1d2ad9ddc9969fc0",
"assets/assets/fonts/librefranklin/LibreFranklin-Light.ttf": "65476f4e756f98b895fd5e4ca33f4129",
"assets/assets/fonts/librefranklin/LibreFranklin-LightItalic.ttf": "382ff9242b9ac50a2c31828b8e6d2eae",
"assets/assets/fonts/librefranklin/LibreFranklin-Medium.ttf": "705750ccdd5c16354e521671788164fa",
"assets/assets/fonts/librefranklin/LibreFranklin-MediumItalic.ttf": "6d119a80f481bb0dac1bfa2f4f80c163",
"assets/assets/fonts/librefranklin/LibreFranklin-Regular.ttf": "5ea0581243d4204b5530a63dfa1b1e7f",
"assets/assets/fonts/librefranklin/LibreFranklin-SemiBold.ttf": "06dc6d1f1051f48239033efaa431c0e6",
"assets/assets/fonts/librefranklin/LibreFranklin-SemiBoldItalic.ttf": "b5226fa886d5d8c864b0b61ef684991a",
"assets/assets/fonts/librefranklin/LibreFranklin-Thin.ttf": "ef8a2ec42107198a7bc8a0dc0aeb4795",
"assets/assets/fonts/librefranklin/LibreFranklin-ThinItalic.ttf": "e390c1bda043724b6d721e234647ca4e",
"assets/assets/fonts/nasalization/nasalization-rg.otf": "3e5a870c6d7a4be23b299043400eae98",
"assets/assets/fonts/Neuton/1d17ed3": "165ad7183be9563e73c9ef7d26b3dadb",
"assets/assets/fonts/Neuton/b2536f10": "75c153ac5c7f0b7e9f5e9b4c13465ee4",
"assets/assets/fonts/Neuton/Neuton-Bold.ttf": "8ffdd063a0a1516516fc5d724c962ffb",
"assets/assets/fonts/Neuton/Neuton-Light.ttf": "75c153ac5c7f0b7e9f5e9b4c13465ee4",
"assets/assets/fonts/Neuton/Neuton-Regular.ttf": "165ad7183be9563e73c9ef7d26b3dadb",
"assets/assets/fonts/Oleo_Script/OleoScript-Bold.ttf": "4a69b0ebcd93357c2823f6af00e1b1c3",
"assets/assets/fonts/Oleo_Script/OleoScript-Regular.ttf": "da6f215b4cb4c69834928c7e26bdb0c4",
"assets/assets/fonts/Open_Sans/OpenSans-Bold.ttf": "d0d2737060b43dd07326a00e97bf4ee6",
"assets/assets/fonts/Open_Sans/OpenSans-BoldItalic.ttf": "84a81a48fff2b1fc53340e047c1ab698",
"assets/assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf": "ce61522315fd29541dae038cb246cd0b",
"assets/assets/fonts/Open_Sans/OpenSans-ExtraBoldItalic.ttf": "61f91fc495ff5e2cc79271f44df10083",
"assets/assets/fonts/Open_Sans/OpenSans-Italic.ttf": "83289392072d6675a89cdee02417eb0c",
"assets/assets/fonts/Open_Sans/OpenSans-Light.ttf": "d62d67fe377845948996542d75853eca",
"assets/assets/fonts/Open_Sans/OpenSans-LightItalic.ttf": "04f08be14f02eab4e385a0efc67b53ff",
"assets/assets/fonts/Open_Sans/OpenSans-Medium.ttf": "e627ba8661be4e6ac3a6d66f5a8a39c1",
"assets/assets/fonts/Open_Sans/OpenSans-MediumItalic.ttf": "5a85b425d14205390312fb59c8835643",
"assets/assets/fonts/Open_Sans/OpenSans-Regular.ttf": "ebe0fbcd13a1e4b1cea24fa992f28fbb",
"assets/assets/fonts/Open_Sans/OpenSans-SemiBold.ttf": "744961de435c265a0ef1103ed67e07cd",
"assets/assets/fonts/Open_Sans/OpenSans-SemiBoldItalic.ttf": "4302020b30b91155f7828eec4274bab8",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-Bold.ttf": "31008374eada9b157d4912540107d5b3",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-BoldItalic.ttf": "c146d79063d213337cdaea877456fa91",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-ExtraBold.ttf": "e8f1c845acc5552eafc89e11dbdc11c7",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-ExtraBoldItalic.ttf": "de2b6e6e0604d5269f64e7d1d5ddc5fa",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-Italic.ttf": "a0033896b59ec207e8391f5f7bb681bf",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-Light.ttf": "f306e4a2814ccaf69c61aa06fec1e164",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-LightItalic.ttf": "1f02bcb7283069ce0fd1c5be0eb531b6",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-Medium.ttf": "54279ac5d604fc37c7b7802756333968",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-MediumItalic.ttf": "5b8ecf3aa5878069dbfb9668838e33ad",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-Regular.ttf": "6f6d7ffc8ce2ae015a461796b28b4afd",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-SemiBold.ttf": "5cb703cb9f468cefba2af32a090557e8",
"assets/assets/fonts/Open_Sans/OpenSans_Condensed-SemiBoldItalic.ttf": "2a75f9b2b1734fc2329e8a581d28a095",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-Bold.ttf": "179d371f35a9a4adbbe424c9cbfe2b75",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-BoldItalic.ttf": "08a678883703485fe7bea9cc3ef370cf",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-ExtraBold.ttf": "54817db857f1fdd6ad010668475dfef0",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-ExtraBoldItalic.ttf": "286010026dc5fa6246be725e4cc04a06",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-Italic.ttf": "102bde0af46285559f1b73747427634c",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-Light.ttf": "1f9bcbc054d29c00b78269fb41838c71",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-LightItalic.ttf": "7774873cac6e957040929a6c81df7ebe",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-Medium.ttf": "cb3ac7d8d5e5305188f75d72dc0596d0",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-MediumItalic.ttf": "8e92cc88f8a0ac303f592ceeb4e8837e",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-Regular.ttf": "ca9d382c503ad5bd3f6dddf3254db726",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-SemiBold.ttf": "66277313f07741971bef7ca32b3ca820",
"assets/assets/fonts/Open_Sans/OpenSans_SemiCondensed-SemiBoldItalic.ttf": "51495f885037b6704eed7f9d737fbb61",
"assets/assets/fonts/Oswald/Oswald-Bold.ttf": "e991dea9f65ce799dd72095ab7ad6e88",
"assets/assets/fonts/Oswald/Oswald-ExtraLight.ttf": "309040b6e57cb05a6863228a4d395521",
"assets/assets/fonts/Oswald/Oswald-Light.ttf": "4be970a1b24aa834afff4b16842c8981",
"assets/assets/fonts/Oswald/Oswald-Medium.ttf": "351c498bd487b476454b8f09a34139a9",
"assets/assets/fonts/Oswald/Oswald-Regular.ttf": "e1996192b98a516646ff9a8c0c0ca90c",
"assets/assets/fonts/Oswald/Oswald-SemiBold.ttf": "c8ff3929086488642de6b260f5c14e5b",
"assets/assets/fonts/Patua_One/PatuaOne-Regular.ttf": "53290205673345c24884f0eac68f3b74",
"assets/assets/fonts/Poppins/7243b356": "41e8dead03fb979ecc23b8dfb0fef627",
"assets/assets/fonts/Poppins/Poppins-Bold.ttf": "c23534acbeddbaadfd0ab2d2bbfdfc84",
"assets/assets/fonts/Poppins/Poppins-Medium.ttf": "ba95810b56f476990ca71d15139d5111",
"assets/assets/fonts/Poppins/Poppins-Regular.ttf": "41e8dead03fb979ecc23b8dfb0fef627",
"assets/assets/fonts/PT_Sans/PTSans-Bold.ttf": "333ee0ee5989e593812c23ca2dd7bc24",
"assets/assets/fonts/PT_Sans/PTSans-BoldItalic.ttf": "22f2e7f9ae109154c0467619164247ea",
"assets/assets/fonts/PT_Sans/PTSans-Italic.ttf": "a97ccf1e30117c053dd28f265c270a22",
"assets/assets/fonts/PT_Sans/PTSans-Regular.ttf": "4ea26cd5e7f64894d6c2451446f7dda5",
"assets/assets/fonts/Raleway/Raleway-Black.ttf": "38b405eba92acbb5aef45d8152f2a736",
"assets/assets/fonts/Raleway/Raleway-BlackItalic.ttf": "82163a0f87990e4f9d9ec2b7893e796a",
"assets/assets/fonts/Raleway/Raleway-Bold.ttf": "7802d8b27fcb19893ce6b38c0789268e",
"assets/assets/fonts/Raleway/Raleway-BoldItalic.ttf": "2c6f0ac361f6a86d7e8d74f3d6737380",
"assets/assets/fonts/Raleway/Raleway-ExtraBold.ttf": "c9503ab0f939e9d37fcfb59b25acf8b3",
"assets/assets/fonts/Raleway/Raleway-ExtraBoldItalic.ttf": "db1ef2f98145c0429dbc90c817a3cfdf",
"assets/assets/fonts/Raleway/Raleway-ExtraLight.ttf": "3d22c4cbf0bbf560dbc16342b6bdccd4",
"assets/assets/fonts/Raleway/Raleway-ExtraLightItalic.ttf": "005cfa6da2e318c6e260b9a4118f4be4",
"assets/assets/fonts/Raleway/Raleway-Italic.ttf": "f73026bcd64e5a5265ab616e5083cd48",
"assets/assets/fonts/Raleway/Raleway-Light.ttf": "6c084270ccdeb72fd9f5a5144cea628f",
"assets/assets/fonts/Raleway/Raleway-LightItalic.ttf": "78efd1da53f2af86712d955dd36af0a7",
"assets/assets/fonts/Raleway/Raleway-Medium.ttf": "2ec8557460d3a2cd7340b16ac84fce32",
"assets/assets/fonts/Raleway/Raleway-MediumItalic.ttf": "a55ff2cd6e2cffc65817240e14da6813",
"assets/assets/fonts/Raleway/Raleway-Regular.ttf": "75b4247fdd3b97d0e3b8e07b115673c2",
"assets/assets/fonts/Raleway/Raleway-SemiBold.ttf": "8a192102b50118c45033e53ce897f103",
"assets/assets/fonts/Raleway/Raleway-SemiBoldItalic.ttf": "2ed1e9696712eac2b9ec02ada1045fcb",
"assets/assets/fonts/Raleway/Raleway-Thin.ttf": "07ac22f3d71e66a0799703116b533ac5",
"assets/assets/fonts/Raleway/Raleway-ThinItalic.ttf": "8fe060be26aca99ed4c879d41c3a8b6d",
"assets/assets/fonts/slabo/Slabo13px-Regular.ttf": "a69f829295a374bc0311677e1e50d8a4",
"assets/assets/fonts/slabo/Slabo27px-Regular.ttf": "f0ac18530be500f7c89818dbd280bda6",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-Black.ttf": "9ded577f93b24331f4faadfc5f834ae6",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-BlackItalic.ttf": "9912ce7396adef3e4895d80f1db48c79",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf": "8669b8706bbbdd1482e2fccc4ed96850",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-BoldItalic.ttf": "38845daef5ac62cb403040d0017fdd0a",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-ExtraLight.ttf": "23a4c2deef3a0cc9b40b429ad7320a18",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-ExtraLightItalic.ttf": "542b437ac4636f19f2a5475170678e07",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-Italic.ttf": "3d7cb86547ce5075625915f2e86d0687",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf": "81cd217e4a8160a930c6d5fb8d1e8e82",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-LightItalic.ttf": "54e87dedd7daccc391c61dc0795a97bd",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf": "c1678b46f7dd3f50ceac94ed4e0ad01a",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-SemiBold.ttf": "83476a890be79f84e97b792c9c40d743",
"assets/assets/fonts/Source_Sans_Pro/SourceSansPro-SemiBoldItalic.ttf": "400001859e5426d443911e7b60009ba5",
"assets/assets/fonts/spacemono/SpaceMono-Bold.ttf": "faf1fe45be4191df427d6074e63b3460",
"assets/assets/fonts/spacemono/SpaceMono-BoldItalic.ttf": "d5bbe05230e12e2215547423473def8d",
"assets/assets/fonts/spacemono/SpaceMono-Italic.ttf": "5a7b6ff581d025f6f7f3f9113f4cfb65",
"assets/assets/fonts/spacemono/SpaceMono-Regular.ttf": "30f0830dc4f19b56236af42822981e47",
"assets/assets/images/24700f76": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/25044e36": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/2fff8ab": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/304c510f": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/318a38cd": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/3b913f78": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/5a0b66f7": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/5cac4ed0": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/7169e53c": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/7a5dcf51": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/8bfc5b58": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/8fb778d2": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/a05f7ef0": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/aba9a0c": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/ae22789f": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/ba2ba8b": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/Banner1.png": "131a20ad6e7440691a40d6ddcde8fa07",
"assets/assets/images/Banner2.png": "3a0f2eb32abb989838f60a3d8a13f876",
"assets/assets/images/Banner3.png": "13eb21550005adc50ee0d93d8191e270",
"assets/assets/images/Banner4.png": "308d24f5ca64654ebfdb2718a1e945f6",
"assets/assets/images/Banner5.png": "ea1ec05ef53fe36cf3276cdb17495bac",
"assets/assets/images/Banner6.png": "4b09214443230eba8e0d9273e9188da9",
"assets/assets/images/c0835d01": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/eccc254b": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/images/facebook.svg": "7257aa522d63add4dda595b899157a67",
"assets/assets/images/github.svg": "a6d8c48cdc66316c579ced5a55cb88ac",
"assets/assets/images/instagram.svg": "c9770910b9b66758b48e9f0714d795fb",
"assets/assets/images/linkedin.svg": "a6a69dc08582933534c67e1c72026fb8",
"assets/assets/images/loading1.gif": "7c1e54a1309395275209d5dec8b2a615",
"assets/assets/images/loading2.gif": "158e40a36646113353f7c0f27c6792e7",
"assets/assets/images/mypic1.png": "e6ea48571f26e6aee89165cd222ef312",
"assets/assets/images/mypic2.png": "8b6c9d6b72187679818c416cbccd6048",
"assets/assets/images/mypic3.png": "cb9a4293ab4c5e3fb3caacdc3b2d47e3",
"assets/assets/images/mypic4.png": "4f50ea9e907eb4115deaf992ca89bc1a",
"assets/assets/images/twitter.svg": "7c14d2dabadb5998f7c5b4c1686051bb",
"assets/assets/images/youtube.svg": "8968a4b8a454b9158ff4b5e6040f1672",
"assets/FontManifest.json": "f7366d3dcd38b91d87f2f397cd8fa2a7",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "fa06d3adde81ecaa0c5c863721b51f01",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "62b9906717d7215a6ff4cc24efbd1b5c",
"canvaskit/canvaskit.wasm": "b179ba02b7a9f61ebc108f82c5a1ecdb",
"canvaskit/profiling/canvaskit.js": "3783918f48ef691e230156c251169480",
"canvaskit/profiling/canvaskit.wasm": "6d1b0fc1ec88c3110db88caa3393c580",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "a53b465e0118329d3a036c792df8630d",
"/": "a53b465e0118329d3a036c792df8630d",
"main.dart.js": "3d9cb8121b0ebdc4f5cf9e4f8dcbd822",
"manifest.json": "e74af8957b5899dc6da961caee768ec9",
"version.json": "009c9e65172e010890f7f65fde438006"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
