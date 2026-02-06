import React, { useState } from "react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/* ======== COLORS ======== */
const C={blue:"#0076BB",green:"#00A84F",orange:"#F15A29",blueDk:"#005A8E",blueL:"#E8F4FB",greenL:"#E6F7ED",orangeL:"#FEF0EB",red:"#DC2626",redL:"#FEE2E2",purple:"#7C3AED",purpleL:"#F3EEFF",g50:"#F8FAFB",g100:"#F1F4F7",g200:"#E2E7ED",g300:"#CDD4DC",g400:"#9BA5B3",g500:"#6B7684",g600:"#4A5464",g700:"#2D3540",g800:"#1A2030",w:"#fff"};
const LOGO=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 467.49 155.04"><defs><style>.a,.b{stroke:#fff;stroke-miterlimit:10;stroke-width:1.4px}.a,.c{fill:#0076bb}.d{fill:#f15a29}.b{fill:#00a84f}</style></defs><g><path class="d" d="M1.7,115.99c-.57-.1-1.13-.21-1.7-.32.57.11,1.13.22,1.7.32Z"/><path class="b" d="M90.64,74.27l-44.04-18.54c-2.41-1.02-4.37-3.96-4.37-6.58v-20.07c0-2.62,1.96-3.92,4.37-2.9l49.29,20.75c8.24,3.47,12.36,8.02,12.36,12.56,0,4.55-4.12,9.09-12.36,12.56l-5.25,2.21Z"/><path class="b" d="M69.98,112.52v26.89c0,2.62-1.96,5.57-4.37,6.58l-19.01,8c-2.41,1.02-4.37-.28-4.37-2.9v-51.7c0-2.62,1.96-5.57,4.37-6.58l49.29-20.75c8.24-3.47,12.36-8.02,12.36-12.56v25.44c0,7.13-4.12,13.21-12.36,16.68l-25.91,10.91Z"/><path class="a" d="M57.48,49.14L13.45,30.6c-2.41-1.02-4.37-3.96-4.37-6.58V3.95C9.08,1.33,11.03.03,13.45,1.05l49.29,20.75c8.24,3.47,12.36,8.02,12.36,12.56,0,4.55-4.12,9.09-12.36,12.56l-5.25,2.21Z"/><path class="a" d="M36.83,87.39v26.89c0,2.62-1.96,5.57-4.37,6.58l-19.01,8c-2.41,1.02-4.37-.28-4.37-2.9v-51.7c0-2.62,1.96-5.57,4.37-6.58l49.29-20.75c8.24-3.47,12.36-8.02,12.36-12.56v25.44c0,7.13-4.12,13.21-12.36,16.68l-25.91,10.91Z"/><path class="c" d="M158.93,92.25h-11.64l-1,5.69h-6.85l2-11.38h19.16c2.39,0,3.86-1.23,3.86-2.96,0-1.3-1.03-2.13-2.96-2.13h-19.16l1.32-5.79h18.24c6.19,0,9.58,2.89,9.58,7.15,0,5.52-4.82,9.41-12.54,9.41Z"/><path class="c" d="M201.41,97.94h-9.21l-3.92-5.89h-10.58l-1.03,5.89h-6.88l2-11.38h19.36c2.29,0,4.29-1.1,4.29-2.89,0-1.46-1.26-2.2-3.39-2.2h-19.36l1.33-5.79h18.5c4.66,0,10.18,1.43,10.18,6.75,0,4.02-2.89,7.42-7.18,8.25.63.57,1.33,1.36,2.56,2.93l3.36,4.32Z"/><path class="c" d="M209.12,97.94l5.19-5.72h5.55c1.36,0,2.89,0,3.96.07-.47-.8-1.16-2.16-1.7-3.23l-2.96-5.89-13.04,14.77h-8.15l17.83-20.12c1.16-1.3,2.73-2.49,4.89-2.49s3.23,1.1,3.96,2.49l10.34,20.12h-25.88Z"/><path class="c" d="M261.3,92.22l-5.42,5.72h-11.18c-6.95,0-11.57-4.19-11.57-9.81,0-7.32,6.98-12.44,15.5-12.44h15.6l-5.45,5.79h-11.18c-4.09,0-7.55,2.63-7.55,6.15,0,2.76,2.29,4.59,5.65,4.59h15.6Z"/><path class="c" d="M287.78,75.69l-1.08,5.79h-8l-2.93,16.46h-6.88l2.89-16.46h-10.44l5.52-5.79h20.93Z"/><path class="c" d="M292.3,97.94h-6.88l3.96-22.25h6.85l-3.93,22.25Z"/><path class="c" d="M322.59,92.22l-1.64,5.72h-14.05c-6.95,0-11.57-4.19-11.57-9.81,0-7.32,6.98-12.44,15.5-12.44h14.93l-1.83,5.79h-14.14c-4.09,0-7.55,2.63-7.55,6.15,0,2.76,2.29,4.59,5.65,4.59h14.69Z"/><path class="c" d="M349.47,92.22l-4.59,5.72h-21.42l3.96-22.25h24.88l-4.62,5.79h-14.4l-.47,2.66h16.73l-3.92,5.06h-13.7l-.53,3.03h18.09Z"/><path class="c" d="M369.18,92.25h-11.64l-1,5.69h-6.85l2-11.38h19.16c2.39,0,3.86-1.23,3.86-2.96,0-1.3-1.03-2.13-2.96-2.13h-19.16l4.14-5.79h15.42c6.19,0,9.58,2.89,9.58,7.15,0,5.52-4.82,9.41-12.54,9.41Z"/><path class="c" d="M405.74,92.22l-5.49,5.72h-19.66l3.96-22.25h6.85l-2.93,16.53h17.26Z"/><path class="c" d="M413.42,97.94l5.19-5.72h5.55c1.36,0,2.89,0,3.96.07-.47-.8-1.16-2.16-1.7-3.23l-2.96-5.89-13.04,14.77h-8.15l17.83-20.12c1.16-1.3,2.73-2.49,4.89-2.49s3.23,1.1,3.96,2.49l10.34,20.12h-25.88Z"/><path class="c" d="M457.15,97.11l-11.47-12.24-2.3,13.07h-6.25l3.23-18.46c.5-2.96,2.46-4.16,4.52-4.16.83,0,1.66.2,2.56,1.2l11.47,12.24,2.33-13.07h6.25l-3.29,18.43c-.53,2.96-2.49,4.19-4.49,4.19-.93,0-1.63-.2-2.56-1.2Z"/></g></svg>`)}`;

/* ======== ASCENSION PARISH SCHOOL DISTRICT DATA ======== */
/* Campuses (locations) */
const campuses=[
  {id:"dths",name:"Dutchtown High School",short:"Dutchtown HS",city:"Geismar"},
  {id:"eahs",name:"East Ascension High School",short:"East Ascension HS",city:"Gonzales"},
  {id:"sahs",name:"St. Amant High School",short:"St. Amant HS",city:"St. Amant"},
  {id:"phs",name:"Prairieville High School",short:"Prairieville HS",city:"Prairieville"},
  {id:"dohs",name:"Donaldsonville High School",short:"Donaldsonville HS",city:"Donaldsonville"},
];
const tabs=["Dashboard","Rentals","Organization","Reporting","Users","Payments"];
const monthlyRev=[{m:"Aug",r:3420},{m:"Sep",r:7850},{m:"Oct",r:11240},{m:"Nov",r:9680},{m:"Dec",r:5840},{m:"Jan",r:14220},{m:"Feb",r:8761}];
const weeklyTrend=[{w:"W1",r:2875,l:1620},{w:"W2",r:3340,l:2780},{w:"W3",r:1960,l:3150},{w:"W4",r:4580,l:2890},{w:"W5",r:5100,l:3340},{w:"W6",r:3761,l:2020}];
const facMix=[
  {n:"Dutchtown High School",v:18296,c:C.blue,assets:3,bookings:62,topAsset:"Dutchtown Gymnasium"},
  {n:"East Ascension High School",v:14700,c:C.green,assets:3,bookings:48,topAsset:"Spartan Stadium"},
  {n:"St. Amant High School",v:11865,c:C.orange,assets:2,bookings:35,topAsset:"St. Amant Gymnasium"},
  {n:"Prairieville High School",v:9450,c:C.purple,assets:2,bookings:28,topAsset:"Prairieville Gymnasium"},
  {n:"Donaldsonville High School",v:6700,c:C.blueDk,assets:2,bookings:19,topAsset:"Tiger Stadium"},
];
const assetPerfData={
  day:[{a:"Dutchtown Gymnasium",r:425,b:3,u:72},{a:"Spartan Stadium",r:0,b:0,u:0},{a:"St. Amant Gymnasium",r:275,b:2,u:58},{a:"Prairieville Gymnasium",r:150,b:1,u:45},{a:"Gator Stadium",r:0,b:0,u:0},{a:"Tiger Stadium",r:0,b:0,u:0}],
  week:[{a:"Dutchtown Gymnasium",r:2346,b:14,u:74},{a:"Spartan Stadium",r:1865,b:6,u:48},{a:"St. Amant Gymnasium",r:1475,b:10,u:62},{a:"Prairieville Gymnasium",r:1130,b:8,u:51},{a:"Gator Stadium",r:850,b:3,u:22},{a:"Tiger Stadium",r:720,b:4,u:34}],
  month:[{a:"Dutchtown Gymnasium",r:8460,b:42,u:68},{a:"Spartan Stadium",r:6765,b:22,u:52},{a:"St. Amant Gymnasium",r:5700,b:30,u:58},{a:"Prairieville Gymnasium",r:4450,b:24,u:55},{a:"Gator Stadium",r:3200,b:10,u:31},{a:"Tiger Stadium",r:2436,b:14,u:38}],
  year:[{a:"Dutchtown Gymnasium",r:18296,b:62,u:68},{a:"Spartan Stadium",r:14700,b:48,u:52},{a:"St. Amant Gymnasium",r:11865,b:35,u:58},{a:"Prairieville Gymnasium",r:9450,b:28,u:55},{a:"Gator Stadium",r:6700,b:19,u:31},{a:"Tiger Stadium",r:5200,b:22,u:38}],
};
const heatmap=[{h:"6AM",d:[0,1,0,0,1,3,2]},{h:"8AM",d:[2,3,1,2,3,5,4]},{h:"10AM",d:[1,2,2,1,2,6,5]},{h:"12PM",d:[3,1,3,2,1,4,3]},{h:"2PM",d:[2,2,1,3,2,5,3]},{h:"4PM",d:[5,4,5,5,6,6,4]},{h:"6PM",d:[6,5,6,4,5,5,3]},{h:"8PM",d:[4,3,4,3,4,3,1]}];
const topCustData=[
  {n:"Bayou City Volleyball",b:18,s:6840,t:"up",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",since:"Aug 2025",fav:"Dutchtown Gymnasium",photo:"BC",
   hist:[{id:"37538201",asset:"Dutchtown Gymnasium",date:"2/7/2026",time:"8-10 AM",rev:350},{id:"54148775",asset:"Dutchtown Gymnasium",date:"2/9/2026",time:"6-8 PM",rev:350},{id:"10293847",asset:"East Ascension Gymnasium",date:"1/18/2026",time:"9-11 AM",rev:400},{id:"29384756",asset:"Dutchtown Gymnasium",date:"1/5/2026",time:"4-6 PM",rev:350},{id:"38475610",asset:"Dutchtown Gymnasium",date:"12/12/2025",time:"8-10 AM",rev:350},{id:"47561029",asset:"East Ascension Gymnasium",date:"11/22/2025",time:"2-4 PM",rev:400}]},
  {n:"Gonzales FC",b:14,s:5274,t:"up",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",since:"Sep 2025",fav:"Prairieville Athletic Complex",photo:"GF",
   hist:[{id:"11244970",asset:"Prairieville Athletic Complex",date:"2/7/2026",time:"8-10 AM",rev:475},{id:"25800922",asset:"Prairieville Athletic Complex",date:"2/9/2026",time:"7:30-9 PM",rev:475},{id:"83746251",asset:"Dutchtown Practice Fields",date:"1/25/2026",time:"5-7 PM",rev:300},{id:"63849201",asset:"Prairieville Athletic Complex",date:"1/11/2026",time:"6-8 PM",rev:475},{id:"92837461",asset:"Dutchtown Practice Fields",date:"12/3/2025",time:"3-5 PM",rev:300}]},
  {n:"Ascension Elite Cheer",b:12,s:4380,t:"stable",email:"elitecheer@ascension.org",phone:"(225) 555-0137",since:"Aug 2025",fav:"St. Amant Gymnasium",photo:"AE",
   hist:[{id:"20617491",asset:"St. Amant Gymnasium",date:"2/6/2026",time:"5-7 PM",rev:325},{id:"74629183",asset:"St. Amant Gymnasium",date:"1/22/2026",time:"6-8 PM",rev:325},{id:"56283910",asset:"Dutchtown Gymnasium",date:"1/8/2026",time:"3-5 PM",rev:350},{id:"19384756",asset:"St. Amant Gymnasium",date:"12/15/2025",time:"5-7 PM",rev:325}]},
  {n:"Louisiana Tigers AAU",b:10,s:3698,t:"up",email:"latigersaau@gmail.com",phone:"(225) 555-0419",since:"Oct 2025",fav:"Dutchtown Gymnasium",photo:"LT",
   hist:[{id:"37524827",asset:"Dutchtown Gymnasium",date:"2/11/2026",time:"6-8 PM",rev:350},{id:"82639104",asset:"Dutchtown Gymnasium",date:"1/28/2026",time:"5-7 PM",rev:350},{id:"19283746",asset:"East Ascension Gymnasium",date:"1/15/2026",time:"2-4 PM",rev:400}]},
  {n:"River Parish Runners",b:6,s:1845,t:"down",email:"rprunners@hotmail.com",phone:"(225) 555-0753",since:"Nov 2025",fav:"Gator Stadium",photo:"RP",
   hist:[{id:"73829104",asset:"Gator Stadium",date:"1/20/2026",time:"4-6 PM",rev:395},{id:"62839104",asset:"Spartan Stadium",date:"1/6/2026",time:"3-5 PM",rev:450}]},
];
const upcoming=[
  {id:"20617491",a:"St. Amant Gymnasium",c:"Ascension Elite Cheer",d:"2/6/2026",dLong:"Fri 2/6/2026",t:"5:00-7:00 PM",r:325,fac:"St. Amant High School",email:"elitecheer@ascension.org",phone:"2255550137",team:"Elite Cheer",people:18,activity:"Cheerleading",created:"02/03/2026 09:33 am",amenities:"N/A",insStart:"02/09/2025",insEnd:"02/09/2026",insActive:true,insNote:"Our AI Failed to find Insurance Coverage limit. Please look into document.",resId:"X82KLyH7x2",pp:true},
  {id:"11244970",a:"Prairieville Athletic Complex",c:"Gonzales FC",d:"2/7/2026",dLong:"Sat 2/7/2026",t:"8:00-10:00 AM",r:475,fac:"Prairieville High School",email:"gonzalesfc@yahoo.com",phone:"2255550294",team:"Gonzales FC U16",people:24,activity:"Soccer",created:"02/01/2026 11:15 am",amenities:"Field Lights, Scoreboard",insStart:"01/15/2025",insEnd:"01/15/2026",insActive:false,insNote:"Insurance expired. Please request updated certificate.",resId:"K93MNpR4w1",pp:true},
  {id:"37538201",a:"Dutchtown Gymnasium",c:"Bayou City Volleyball",d:"2/7/2026",dLong:"Sat 2/7/2026",t:"8:00-10:00 AM",r:350,fac:"Dutchtown High School",email:"bayoucityvb@gmail.com",phone:"2255550182",team:"Bayou City VB",people:22,activity:"Volleyball",created:"01/28/2026 02:47 pm",amenities:"Scoreboard, Bleachers",insStart:"03/01/2025",insEnd:"03/01/2026",insActive:true,insNote:null,resId:"P47QRsT8z3",pp:true},
  {id:"54148775",a:"Dutchtown Gymnasium",c:"Bayou City Volleyball",d:"2/9/2026",dLong:"Mon 2/9/2026",t:"6:00-8:00 PM",r:350,fac:"Dutchtown High School",email:"bayoucityvb@gmail.com",phone:"2255550182",team:"Bayou City VB",people:18,activity:"Volleyball Practice",created:"01/28/2026 02:50 pm",amenities:"N/A",insStart:"03/01/2025",insEnd:"03/01/2026",insActive:true,insNote:null,resId:"W82XYzA5b6",pp:true},
  {id:"25800922",a:"Prairieville Athletic Complex",c:"Gonzales FC",d:"2/9/2026",dLong:"Mon 2/9/2026",t:"7:30-9:00 PM",r:475,fac:"Prairieville High School",email:"gonzalesfc@yahoo.com",phone:"2255550294",team:"Gonzales FC U16",people:22,activity:"Soccer",created:"02/01/2026 11:20 am",amenities:"Field Lights",insStart:"01/15/2025",insEnd:"01/15/2026",insActive:false,insNote:"Insurance expired. Please request updated certificate.",resId:"J55KLmN2c8",pp:true},
  {id:"37524827",a:"Dutchtown Gymnasium",c:"Louisiana Tigers AAU",d:"2/11/2026",dLong:"Wed 2/11/2026",t:"6:00-8:00 PM",r:350,fac:"Dutchtown High School",email:"latigersaau@gmail.com",phone:"2255550419",team:"LA Tigers",people:14,activity:"Basketball",created:"02/04/2026 08:12 am",amenities:"Scoreboard",insStart:"06/01/2025",insEnd:"06/01/2026",insActive:true,insNote:null,resId:"R29STuV7d4",pp:true},
];
/* Calendar: mixed synced events (school/district) + PP- prefixed PracticePlan bookings */
/* src: "pp"=PracticePlan, "google"=Google Calendar, "rankone"=RankOne, "outlook"=Outlook */
const calEvents={
  2:[{l:"JV Basketball vs. Hahnville",t:"5:30 PM",c:"#94A3B8",a:"DT Gym",src:"rankone"},{l:"PP - River Parish Track",t:"4-6 PM",c:C.green,a:"Spartan Stadium",src:"pp"}],
  3:[{l:"Faculty Meeting",t:"3:30 PM",c:"#94A3B8",a:"EA Cafeteria",src:"google"},{l:"PP - Elite Cheer Practice",t:"6-8 PM",c:C.orange,a:"SA Gym",src:"pp"}],
  4:[{l:"Varsity Basketball vs. St. Amant",t:"7:00 PM",c:"#94A3B8",a:"DT Gym",src:"rankone"},{l:"Swim Team Practice",t:"3:30-5 PM",c:"#94A3B8",a:"EA Pool",src:"google"}],
  5:[{l:"PP - Gonzales FC Practice",t:"5-7 PM",c:C.purple,a:"PV Complex",src:"pp"},{l:"Girls Soccer vs. Central",t:"5:30 PM",c:"#94A3B8",a:"DT Stadium",src:"rankone"}],
  6:[{l:"PP - Elite Cheer",t:"5-7 PM",c:C.orange,a:"SA Gym",src:"pp"},{l:"Varsity Baseball Practice",t:"3:30-5:30 PM",c:"#94A3B8",a:"DT Fields",src:"rankone"},{l:"Board Meeting",t:"6 PM",c:"#94A3B8",a:"District Office",src:"outlook"}],
  7:[{l:"PP - Bayou City VB",t:"8-10 AM",c:C.blue,a:"DT Gym",src:"pp"},{l:"PP - Gonzales FC",t:"8-10 AM",c:C.purple,a:"PV Complex",src:"pp"},{l:"ACT Prep Workshop",t:"9 AM-12 PM",c:"#94A3B8",a:"EA Cafeteria",src:"google"}],
  9:[{l:"PP - Bayou City VB",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"PP - Gonzales FC",t:"7:30-9 PM",c:C.purple,a:"PV Complex",src:"pp"},{l:"JV Baseball vs. Lutcher",t:"4:30 PM",c:"#94A3B8",a:"DT Fields",src:"rankone"}],
  10:[{l:"Wrestling District Meet",t:"9 AM-4 PM",c:"#94A3B8",a:"EA Gym",src:"rankone"},{l:"PP - LA Tigers Practice",t:"6-8 PM",c:C.blue,a:"EA Gym",src:"pp"}],
  11:[{l:"PP - LA Tigers AAU",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"Varsity Softball Practice",t:"3:30-5:30 PM",c:"#94A3B8",a:"SA Fields",src:"rankone"},{l:"PTA Meeting",t:"6 PM",c:"#94A3B8",a:"PV Gym",src:"google"}],
  12:[{l:"Varsity Basketball @ Thibodaux",t:"7 PM",c:"#94A3B8",a:"Away",src:"rankone"},{l:"PP - Bayou City VB",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"}],
  13:[{l:"PP - Ascension Dance",t:"5-7 PM",c:C.orange,a:"SA Gym",src:"pp"},{l:"Baseball Scrimmage",t:"4 PM",c:"#94A3B8",a:"Spartan Stadium",src:"rankone"},{l:"PP - River Parish",t:"4-6 PM",c:C.green,a:"Gator Stadium",src:"pp"}],
  14:[{l:"Valentines Dance",t:"7-10 PM",c:"#94A3B8",a:"DT Gym",src:"google"},{l:"PP - Gonzales FC",t:"9-11 AM",c:C.purple,a:"PV Complex",src:"pp"}],
  16:[{l:"Presidents Day - No School",t:"All Day",c:"#94A3B8",a:"District",src:"outlook"},{l:"PP - Bayou City VB Tourney",t:"8 AM-4 PM",c:C.blue,a:"DT Gym",src:"pp"}],
  17:[{l:"PP - Elite Cheer Comp Prep",t:"5-8 PM",c:C.orange,a:"SA Gym",src:"pp"},{l:"Track Meet Setup",t:"3 PM",c:"#94A3B8",a:"Spartan Stadium",src:"google"}],
  18:[{l:"Varsity Basketball Playoffs",t:"7 PM",c:"#94A3B8",a:"DT Gym",src:"rankone"},{l:"PP - Gonzales FC",t:"9-11 AM",c:C.purple,a:"PV Complex",src:"pp"}],
  19:[{l:"PP - LA Tigers AAU",t:"6-8 PM",c:C.blue,a:"EA Gym",src:"pp"}],
  20:[{l:"Teacher Inservice",t:"All Day",c:"#94A3B8",a:"All Campuses",src:"outlook"},{l:"PP - Bayou City VB",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"PP - River Parish",t:"4-6 PM",c:C.green,a:"Gator Stadium",src:"pp"}],
  21:[{l:"District Track Invitational",t:"8 AM-3 PM",c:"#94A3B8",a:"Spartan Stadium",src:"rankone"},{l:"PP - Gonzales FC Tourney",t:"8 AM-12 PM",c:C.purple,a:"PV Complex",src:"pp"}],
  23:[{l:"PP - Elite Cheer",t:"6-8 PM",c:C.orange,a:"SA Gym",src:"pp"},{l:"Science Fair Setup",t:"3-5 PM",c:"#94A3B8",a:"EA Cafeteria",src:"google"}],
  24:[{l:"PP - LA Tigers AAU",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"Softball vs. Denham Springs",t:"4:30 PM",c:"#94A3B8",a:"SA Fields",src:"rankone"}],
  25:[{l:"PP - Bayou City VB",t:"6-8 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"Spring Football Mtg",t:"6 PM",c:"#94A3B8",a:"DT Stadium",src:"google"}],
  26:[{l:"PP - Gonzales FC",t:"5-7 PM",c:C.purple,a:"PV Complex",src:"pp"},{l:"Baseball vs. Walker",t:"6 PM",c:"#94A3B8",a:"DT Fields",src:"rankone"}],
  27:[{l:"PP - Community Youth BBall",t:"9 AM-12 PM",c:C.blueDk,a:"DO Gym",src:"pp"},{l:"PP - Elite Cheer Showcase",t:"1-4 PM",c:C.orange,a:"SA Gym",src:"pp"}],
  28:[{l:"PP - Bayou City VB",t:"4-6 PM",c:C.blue,a:"DT Gym",src:"pp"},{l:"Baseball Practice",t:"3:30-5:30 PM",c:"#94A3B8",a:"DT Fields",src:"rankone"},{l:"PP - Ascension Dance",t:"6-8 PM",c:C.orange,a:"SA Gym",src:"pp"}],
};
const amenities=[{n:"Scoreboard Operation",p:150},{n:"Bleacher Setup (1000+)",p:300},{n:"Field Lights",p:200},{n:"Press Box Access",p:250},{n:"Concessions",p:350},{n:"PA Announcer",p:175},{n:"Locker Rooms",p:200},{n:"Track Usage",p:190},{n:"Security Officer",p:225},{n:"AC/Climate Control",p:100}];
/* Notifications */
const notifs=[{type:"alert",msg:"Gonzales FC insurance expired 01/15/2026 - 2 upcoming bookings at risk",time:"2h ago",read:false},{type:"approval",msg:"Pending Approval: Bayou City Volleyball - Dutchtown Gym, 2/14 6-9 PM ($525)",time:"35m ago",read:false,approvalId:"APR-0042"},{type:"info",msg:"Bayou City Volleyball booked Dutchtown Gym for 2/7",time:"5h ago",read:false},{type:"approval",msg:"Pending Approval: Louisiana Tigers AAU - EA Gymnasium, 2/15 10AM-2PM ($400)",time:"4h ago",read:false,approvalId:"APR-0041"},{type:"success",msg:"February payout processed - $8,761.25",time:"1d ago",read:true},{type:"alert",msg:"RankOne sync conflict: Varsity Basketball overlaps PP booking on 2/18 at DT Gym",time:"1d ago",read:false},{type:"approval",msg:"Pending Approval: Gonzales FC - Prairieville Complex, 2/22 8AM-12PM ($475)",time:"1d ago",read:false,approvalId:"APR-0040"},{type:"info",msg:"Louisiana Tigers AAU completed onboarding",time:"3d ago",read:true}];
/* Approvals data */
let approvalsDataInit=[
  {id:"APR-0042",org:"Bayou City Volleyball",contact:"Sarah Fontenot",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",campus:"Dutchtown High School",discount:0,expiresIn:"2 Days",status:"pending",submitted:"02/04/2026",notes:"Recurring weekly booking request for volleyball practice. Has existing COI on file.",photo:"BC",color:C.blue,insStart:"03/01/2025",insEnd:"03/01/2026",insActive:true,insLimit:"$300,000",
   bk:[
     {bid:"BK-1042A",asset:"Dutchtown Gymnasium",date:"02/14/2026",time:"6:00 PM - 9:00 PM",hours:3,rev:525,activity:"Volleyball",people:22,amenities:"Scoreboard, Bleachers",created:"02/04/2026 09:12 am"},
     {bid:"BK-1042B",asset:"Dutchtown Gymnasium",date:"02/21/2026",time:"6:00 PM - 9:00 PM",hours:3,rev:525,activity:"Volleyball",people:22,amenities:"Scoreboard, Bleachers",created:"02/04/2026 09:12 am"},
     {bid:"BK-1042C",asset:"Dutchtown Gymnasium",date:"02/28/2026",time:"6:00 PM - 9:00 PM",hours:3,rev:525,activity:"Volleyball",people:22,amenities:"Scoreboard, Bleachers",created:"02/04/2026 09:12 am"},
   ]},
  {id:"APR-0041",org:"Louisiana Tigers AAU",contact:"James Washington",email:"latigersaau@gmail.com",phone:"(225) 555-0419",campus:"East Ascension High School",discount:0,expiresIn:"3 Days",status:"pending",submitted:"02/03/2026",notes:"Tournament prep session. Will need bleacher setup and scoreboard operation.",photo:"LT",color:C.green,insStart:"06/01/2025",insEnd:"06/01/2026",insActive:true,insLimit:"$500,000",
   bk:[
     {bid:"BK-1041A",asset:"East Ascension Gymnasium",date:"02/15/2026",time:"10:00 AM - 2:00 PM",hours:4,rev:400,activity:"Basketball",people:14,amenities:"Scoreboard, Bleacher Setup",created:"02/03/2026 10:45 am"},
   ]},
  {id:"APR-0040",org:"Gonzales FC",contact:"Marco Reyes",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",campus:"Prairieville High School",discount:0,expiresIn:"0 Days",status:"pending",submitted:"02/02/2026",notes:"Saturday morning scrimmage. Field lights and concession stand requested.",photo:"GF",color:C.purple,insStart:"01/15/2025",insEnd:"01/15/2026",insActive:false,insLimit:"N/A",
   bk:[
     {bid:"BK-1040A",asset:"Prairieville Athletic Complex",date:"02/22/2026",time:"8:00 AM - 12:00 PM",hours:4,rev:475,activity:"Soccer",people:24,amenities:"Field Lights, Concessions",created:"02/02/2026 03:30 pm"},
     {bid:"BK-1040B",asset:"Prairieville Athletic Complex",date:"03/01/2026",time:"8:00 AM - 12:00 PM",hours:4,rev:475,activity:"Soccer",people:24,amenities:"Field Lights",created:"02/02/2026 03:30 pm"},
   ]},
  {id:"APR-0039",org:"Ascension Elite Cheer",contact:"Brittany Hebert",email:"elitecheer@ascension.org",phone:"(225) 555-0137",campus:"St. Amant High School",discount:0,expiresIn:"--",status:"approved",submitted:"01/29/2026",notes:"Competition prep. Approved by Coach Bourque.",photo:"AE",color:C.orange,insStart:"02/09/2025",insEnd:"02/09/2026",insActive:true,insLimit:"$300,000",
   bk:[
     {bid:"BK-1039A",asset:"St. Amant Gymnasium",date:"02/08/2026",time:"9:00 AM - 12:00 PM",hours:3,rev:325,activity:"Cheerleading",people:18,amenities:"N/A",created:"01/29/2026 08:20 am"},
   ]},
  {id:"APR-0038",org:"River Parish Runners",contact:"Denise Toups",email:"rprunners@hotmail.com",phone:"(225) 555-0753",campus:"St. Amant High School",discount:0,expiresIn:"--",status:"denied",submitted:"01/25/2026",notes:"Denied - track resurfacing scheduled for this date. Offered 2/8 as alternative.",photo:"RP",color:C.g400,insStart:"04/01/2025",insEnd:"04/01/2026",insActive:true,insLimit:"$300,000",
   bk:[
     {bid:"BK-1038A",asset:"Gator Stadium",date:"02/01/2026",time:"6:00 AM - 8:00 AM",hours:2,rev:190,activity:"Track & Field",people:12,amenities:"N/A",created:"01/25/2026 11:00 am"},
   ]},
];
/* Global approval state management */
let globalApprovals=null;
let globalSetApprovals=null;
let globalPrompt=null;
let globalSetPrompt=null;
function useApprovals(){return{approvals:globalApprovals||approvalsDataInit,setApprovals:globalSetApprovals||(()=>{}),prompt:globalPrompt,setPrompt:globalSetPrompt||(()=>{})}}
function triggerApproval(id,action){if(globalSetPrompt)globalSetPrompt({id,action,reason:""})}

/* Approval Confirmation Prompt */
function ApprovalPrompt(){
  const {prompt,setPrompt,approvals,setApprovals}=useApprovals();
  if(!prompt)return null;
  const a=approvals.find(x=>x.id===prompt.id);
  if(!a)return null;
  const isApprove=prompt.action==="approved";
  const confirm=(withReason)=>{
    const note=withReason&&prompt.reason.trim()?` ${isApprove?"Approved":"Denied"} by Marcus Williams: ${prompt.reason.trim()}`:"";
    setApprovals(approvals.map(x=>x.id===prompt.id?{...x,status:prompt.action,expiresIn:"--",notes:note?((x.notes||"")+note):x.notes}:x));
    setPrompt(null);
  };
  return <>
    <div onClick={()=>setPrompt(null)} style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.4)",backdropFilter:"blur(2px)",zIndex:300,animation:"fadeIn .2s ease"}}/>
    <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:440,maxWidth:"92vw",background:C.w,borderRadius:14,boxShadow:"0 20px 60px rgba(0,0,0,0.18)",zIndex:301,fontFamily:font,animation:"slideUp .25s ease"}}>
      <div style={{padding:"24px 28px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:C.g800}}>{isApprove?"Approve":"Deny"} Reservation</div>
            <div style={{fontSize:13,color:C.g500,marginTop:4}}>{a.org} - {a.id}</div>
          </div>
          <button onClick={()=>setPrompt(null)} style={{background:C.g100,border:"none",width:30,height:30,borderRadius:8,fontSize:14,color:C.g500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        <div style={{padding:"14px 16px",background:C.g50,borderRadius:8,border:`1px solid ${C.g200}`,marginBottom:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["Asset",a.bk[0].asset],["Bookings",a.bk.length+" booking"+(a.bk.length>1?"s":"")],["Date",a.bk.length===1?a.bk[0].date:a.bk[0].date+" + "+(a.bk.length-1)+" more"],["Revenue","$"+a.bk.reduce((s,b)=>s+b.rev,0).toLocaleString()]].map(([l,v])=><div key={l}>
              <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
              <div style={{fontSize:13,fontWeight:600,color:C.g700,marginTop:1}}>{v}</div>
            </div>)}
          </div>
        </div>

        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:600,color:C.g700,marginBottom:6}}>Reason <span style={{fontWeight:400,color:C.g400}}>(optional)</span></div>
          <textarea value={prompt.reason} onChange={e=>setPrompt({...prompt,reason:e.target.value})} placeholder={isApprove?"Reason for approval...":"Reason for denial..."} rows={3} style={{width:"100%",padding:"10px 12px",border:`1px solid ${C.g300}`,borderRadius:8,fontSize:12,fontFamily:font,resize:"vertical",color:C.g700}}/>
        </div>
      </div>

      <div style={{padding:"0 28px 24px",display:"flex",gap:10}}>
        <button onClick={()=>confirm(true)} style={{flex:1,padding:"11px",borderRadius:8,border:"none",background:isApprove?C.green:C.red,color:C.w,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font}}>{isApprove?"Approve":"Deny"}{prompt.reason.trim()?" with Reason":""}</button>
        <button onClick={()=>confirm(false)} style={{flex:1,padding:"11px",borderRadius:8,border:`1px solid ${C.g300}`,background:C.w,color:C.g700,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font}}>Skip Reason & {isApprove?"Approve":"Deny"}</button>
      </div>
    </div>
  </>
}
/* pendingApprovals computed per-component from stateful approvals */
/* Users data */
const usersData=[
  {name:"Marcus Williams",email:"m.williams@apsb.org",role:"District Admin",loc:"District Office",status:true,updated:"02/01/2026",initials:"MW",color:C.blue},
  {name:"Coach Tony Richard",email:"t.richard@apsb.org",role:"Site Admin",loc:"Dutchtown High School",status:true,updated:"01/28/2026",initials:"TR",color:C.green},
  {name:"Denise Landry",email:"d.landry@apsb.org",role:"Site Admin",loc:"East Ascension High School",status:true,updated:"01/25/2026",initials:"DL",color:C.orange},
  {name:"Coach Ray Bourque",email:"r.bourque@apsb.org",role:"Site Admin",loc:"St. Amant High School",status:true,updated:"01/30/2026",initials:"RB",color:C.purple},
  {name:"Amy Melancon",email:"a.melancon@apsb.org",role:"Site Admin",loc:"Prairieville High School",status:true,updated:"02/03/2026",initials:"AM",color:C.blueDk},
  {name:"Derek Simmons",email:"d.simmons@apsb.org",role:"Facility Mgr",loc:"Donaldsonville High School",status:true,updated:"01/20/2026",initials:"DS",color:C.g500},
  {name:"Bayou City Volleyball",email:"bayoucityvb@gmail.com",role:"Participant",loc:"Dutchtown High School",status:true,updated:"02/05/2026",initials:"BC",color:C.blue},
  {name:"Gonzales FC",email:"gonzalesfc@yahoo.com",role:"Participant",loc:"Prairieville High School",status:true,updated:"02/01/2026",initials:"GF",color:C.purple},
  {name:"Ascension Elite Cheer",email:"elitecheer@ascension.org",role:"Participant",loc:"St. Amant High School",status:true,updated:"02/03/2026",initials:"AE",color:C.orange},
  {name:"Louisiana Tigers AAU",email:"latigersaau@gmail.com",role:"Participant",loc:"Dutchtown High School",status:true,updated:"02/04/2026",initials:"LT",color:C.green},
  {name:"River Parish Runners",email:"rprunners@hotmail.com",role:"Participant",loc:"St. Amant High School",status:false,updated:"01/06/2026",initials:"RP",color:C.g400},
];
/* Payments data */
const paymentsData=[
  {date:"Feb-05-2026",time:"02:15 PM",asset:"Dutchtown Gymnasium",fac:"Dutchtown High School",rev:350,count:1,dur:"2h",user:"Bayou City Volleyball",status:"completed"},
  {date:"Feb-03-2026",time:"09:22 AM",asset:"Prairieville Athletic Complex",fac:"Prairieville High School",rev:950,count:2,dur:"4h",user:"Gonzales FC",status:"failed"},
  {date:"Feb-01-2026",time:"02:47 PM",asset:"Dutchtown Gymnasium",fac:"Dutchtown High School",rev:700,count:2,dur:"4h",user:"Bayou City Volleyball",status:"completed"},
  {date:"Jan-28-2026",time:"11:15 AM",asset:"St. Amant Gymnasium",fac:"St. Amant High School",rev:650,count:2,dur:"4h",user:"Ascension Elite Cheer",status:"completed"},
  {date:"Jan-22-2026",time:"06:00 PM",asset:"Dutchtown Gymnasium",fac:"Dutchtown High School",rev:350,count:1,dur:"2h",user:"Louisiana Tigers AAU",status:"completed"},
  {date:"Jan-20-2026",time:"04:00 PM",asset:"Gator Stadium",fac:"St. Amant High School",rev:395,count:1,dur:"2h",user:"River Parish Runners",status:"pending"},
  {date:"Jan-18-2026",time:"09:00 AM",asset:"East Ascension Gymnasium",fac:"East Ascension High School",rev:400,count:1,dur:"2h",user:"Bayou City Volleyball",status:"completed"},
  {date:"Jan-15-2026",time:"02:00 PM",asset:"East Ascension Gymnasium",fac:"East Ascension High School",rev:400,count:1,dur:"2h",user:"Louisiana Tigers AAU",status:"completed"},
  {date:"Jan-11-2026",time:"06:00 PM",asset:"Prairieville Athletic Complex",fac:"Prairieville High School",rev:475,count:1,dur:"2h",user:"Gonzales FC",status:"completed"},
  {date:"Jan-08-2026",time:"03:00 PM",asset:"Dutchtown Gymnasium",fac:"Dutchtown High School",rev:350,count:1,dur:"2h",user:"Ascension Elite Cheer",status:"completed"},
];
/* Reporting */
const revByFacData=[{m:"Sep",dt:2800,ea:2100,sa:1500,pv:900,dn:550},{m:"Oct",dt:4200,ea:3100,sa:2200,pv:1100,dn:640},{m:"Nov",dt:3600,ea:2700,sa:1800,pv:1000,dn:580},{m:"Dec",dt:2100,ea:1600,sa:1200,pv:600,dn:340},{m:"Jan",dt:5800,ea:4100,sa:2400,pv:1400,dn:520},{m:"Feb",dt:3400,ea:2500,sa:1600,pv:850,dn:411}];
const payoutsData=[{month:"Oct 2025",total:11240,status:"paid",date:"11/01/2025"},{month:"Nov 2025",total:9680,status:"paid",date:"12/01/2025"},{month:"Dec 2025",total:5840,status:"paid",date:"01/02/2026"},{month:"Jan 2026",total:14220,status:"paid",date:"02/01/2026"},{month:"Feb 2026",total:8761.25,status:"processing",date:"03/01/2026"}];
/* Detailed payout transactions mirroring real Stripe transfer data */
const txnData=[
  {id:"7kR2mBxH4q",updatedAt:"02/05/26 10:18 pm",resId:"lpWOuBlkFa",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"02/06/26",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SxfeTBPaTHg8GrQh52FYgCD",acctPayId:"py_1SxfeTBUbsUICInXTJ9GVVYD",intentId:"pi_3SwkwnBPaTHg8GrQ4Olhgh3W"},
  {id:"55prUzHLVR",updatedAt:"02/05/26 10:24 pm",resId:"K93MNpR4w1",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"02/06/26",destAcct:"acct_1ScWpNB3rReV834a",amount:475.00,discount:"N/A",status:"success",transferId:"tr_1SxfeUBPaTHg8GrQ9xk3R7mN",acctPayId:"py_1SxfeUBUbsUICInX8mL2pQwR",intentId:"pi_3Swl1YBPaTHg8GrQ2vGPMglW"},
  {id:"SINYt3iC1O",updatedAt:"02/03/26 10:24 pm",resId:"L75jO3fVuv",asset:"St. Amant Gymnasium",facility:"St. Amant High School",transferDate:"02/04/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:325.00,discount:"N/A",status:"success",transferId:"tr_1SwwhLBPaTHg8GrQLzjmZUx3",acctPayId:"py_1SwwhLBUbsUICInXvLR0sqEO",intentId:"pi_3Swl1YBPaTHg8GrQ2vGPMglW"},
  {id:"9PSCCpFfci",updatedAt:"02/04/26 10:24 pm",resId:"FtuEkJ4pjD",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"02/05/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SxJAvBPaTHg8GrQ1ihuoabL",acctPayId:"py_1SxJAvBUbsUICInXiEqFEkvN",intentId:"pi_3Swl1YBPaTHg8GrQ2vGPMglW"},
  {id:"mQ8nYwZ3kP",updatedAt:"02/02/26 04:15 pm",resId:"R29STuV7d4",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"02/03/26",destAcct:"acct_1ScWpNB3rReV834a",amount:475.00,discount:"N/A",status:"success",transferId:"tr_1SwJKmBPaTHg8GrQf7nWxR2e",acctPayId:"py_1SwJKmBUbsUICInXp4L9vTfH",intentId:"pi_3SvR8kBPaTHg8GrQ1mNpQr5Y"},
  {id:"aB4cDeFgHi",updatedAt:"02/01/26 02:47 pm",resId:"P47QRsT8z3",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"02/02/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1Sw2RsBPaTHg8GrQ3kL8nMpQ",acctPayId:"py_1Sw2RsBUbsUICInXw9fJ2rTv",intentId:"pi_3SvfTnBPaTHg8GrQ0xKjHm4R"},
  {id:"jK5lMnOpQr",updatedAt:"01/30/26 06:24 am",resId:"W82XYzA5b6",asset:"East Ascension Gymnasium",facility:"East Ascension High School",transferDate:"01/31/26",destAcct:"acct_1ScWpNB3rReV834a",amount:400.00,discount:"N/A",status:"success",transferId:"tr_1SvFoABPaTHg8GrQWs9Dx6zi",acctPayId:"py_1SvFoAB3rReV834aFf7om983",intentId:"pi_3SrhtSBPaTHg8GrQ1gDETZaH"},
  {id:"sT6uVwXyZa",updatedAt:"01/28/26 11:15 am",resId:"J55KLmN2c8",asset:"St. Amant Gymnasium",facility:"St. Amant High School",transferDate:"01/29/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:325.00,discount:"N/A",status:"success",transferId:"tr_1SvFoEBPaTHg8GrQtFK7czfc",acctPayId:"py_1SvFoEB3rReV834ax0CPMHE4",intentId:"pi_3SrhtSBPaTHg8GrQ1gDETZaH"},
  {id:"bC7dEfGhIj",updatedAt:"01/26/26 09:30 am",resId:"qziBigKYcm",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"01/27/26",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SvFoFBPaTHg8GrQ5JBNRprF",acctPayId:"py_1SvFoFB3rReV834aykqtGD2Y",intentId:"pi_3SrhtSBPaTHg8GrQ1gDETZaH"},
  {id:"kL8mNoPqRs",updatedAt:"01/22/26 06:00 pm",resId:"5KYfqHHuI5",asset:"Gator Stadium",facility:"St. Amant High School",transferDate:"01/23/26",destAcct:"acct_1ScWpNB3rReV834a",amount:395.00,discount:"N/A",status:"success",transferId:"tr_1SvFoHBPaTHg8GrQbKeQkVbJ",acctPayId:"py_1SvFoHB3rReV834a3vewNkQM",intentId:"pi_3SrnEZBPaTHg8GrQ1rjleP6J"},
  {id:"tU9vWxYzAb",updatedAt:"01/20/26 04:00 pm",resId:"gR2Ums4KQH",asset:"Spartan Stadium",facility:"East Ascension High School",transferDate:"01/21/26",destAcct:"acct_1ScWpNB3rReV834a",amount:450.00,discount:"N/A",status:"success",transferId:"tr_1SuRkTBPaTHg8GrQ7nL3mQwE",acctPayId:"py_1SuRkTBUbsUICInXq2K8pRtY",intentId:"pi_3StZ9RBPaTHg8GrQ3jMkLn6W"},
  {id:"cD0eFgHiJk",updatedAt:"01/18/26 09:00 am",resId:"XCTQOLE7wU",asset:"East Ascension Gymnasium",facility:"East Ascension High School",transferDate:"01/19/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:400.00,discount:"N/A",status:"success",transferId:"tr_1StH2nBPaTHg8GrQ5xK7rMpQ",acctPayId:"py_1StH2nBUbsUICInXw3fL9vTh",intentId:"pi_3SsP1mBPaTHg8GrQ2kNjHn8S"},
  {id:"lM1nOpQrSt",updatedAt:"01/15/26 02:00 pm",resId:"lpWOuBlkFa",asset:"East Ascension Gymnasium",facility:"East Ascension High School",transferDate:"01/16/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:400.00,discount:"N/A",status:"success",transferId:"tr_1Ss8LpBPaTHg8GrQ9mN2kQwR",acctPayId:"py_1Ss8LpBUbsUICInXt6J4rTvY",intentId:"pi_3SrG0oBPaTHg8GrQ1lMjKn5W"},
  {id:"uV2wXyZaBc",updatedAt:"01/11/26 06:00 pm",resId:"L75jO3fVuv",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"01/12/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:475.00,discount:"N/A",status:"success",transferId:"tr_1SqYRtBPaTHg8GrQ4kL7mNpS",acctPayId:"py_1SqYRtBUbsUICInXr8J3pQtW",intentId:"pi_3SpgQsBPaTHg8GrQ0jKiHn7R"},
  {id:"dE3fGhIjKl",updatedAt:"01/08/26 03:00 pm",resId:"FtuEkJ4pjD",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"01/09/26",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SpOHsBPaTHg8GrQ2nM8kQwT",acctPayId:"py_1SpOHsBUbsUICInXv5L1rTwZ",intentId:"pi_3SoWGrBPaTHg8GrQ3lNjKm6S"},
  {id:"mN4oPqRsTu",updatedAt:"01/06/26 03:00 pm",resId:"J55KLmN2c8",asset:"Spartan Stadium",facility:"East Ascension High School",transferDate:"01/07/26",destAcct:"acct_1ScWpNB3rReV834a",amount:450.00,discount:"N/A",status:"success",transferId:"tr_1SoEAtBPaTHg8GrQ6mL9kNpU",acctPayId:"py_1SoEAtBUbsUICInXw2K4rQtX",intentId:"pi_3SnM9sBPaTHg8GrQ1jMiHn5T"},
  {id:"vW5xYzAbCd",updatedAt:"01/05/26 04:00 pm",resId:"qziBigKYcm",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"01/06/26",destAcct:"acct_1SwUtFBUbsUICInX",amount:350.00,discount:"APSD10",status:"success",transferId:"tr_1Sn5BuBPaTHg8GrQ8nM0kQwV",acctPayId:"py_1Sn5BuBUbsUICInXt3L6rTxY",intentId:"pi_3SmD0tBPaTHg8GrQ2lNjKn7U"},
  {id:"eF6gHiJkLm",updatedAt:"12/20/25 10:00 am",resId:"gR2Ums4KQH",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"12/21/25",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SlvCvBPaTHg8GrQ0mL1kNpW",acctPayId:"py_1SlvCvBUbsUICInXr7K5rQtZ",intentId:"pi_3SkD9uBPaTHg8GrQ3jMiHn8V"},
  {id:"nO7pQrStUv",updatedAt:"12/15/25 05:00 pm",resId:"XCTQOLE7wU",asset:"St. Amant Gymnasium",facility:"St. Amant High School",transferDate:"12/16/25",destAcct:"acct_1SwUtFBUbsUICInX",amount:325.00,discount:"N/A",status:"success",transferId:"tr_1SklDwBPaTHg8GrQ2nM2kQwX",acctPayId:"py_1SklDwBUbsUICInXv8L6rTyA",intentId:"pi_3SjsCtBPaTHg8GrQ1lNjKn9W"},
  {id:"wX8yZaBcDe",updatedAt:"12/12/25 08:00 am",resId:"5KYfqHHuI5",asset:"Dutchtown Gymnasium",facility:"Dutchtown High School",transferDate:"12/13/25",destAcct:"acct_1ScWpNB3rReV834a",amount:350.00,discount:"N/A",status:"success",transferId:"tr_1SjbExBPaTHg8GrQ4mL3kNpY",acctPayId:"py_1SjbExBUbsUICInXr9K7rQuB",intentId:"pi_3SiiDwBPaTHg8GrQ2jMiHn0X"},
  {id:"fG9hIjKlMn",updatedAt:"12/03/25 03:00 pm",resId:"lpWOuBlkFa",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"12/04/25",destAcct:"acct_1SwUtFBUbsUICInX",amount:300.00,discount:"N/A",status:"success",transferId:"tr_1SiRFyBPaTHg8GrQ6nM4kQwZ",acctPayId:"py_1SiRFyBUbsUICInXv0L8rTzC",intentId:"pi_3ShZExBPaTHg8GrQ3lNjKnAY"},
  {id:"oP0qRsTuVw",updatedAt:"11/22/25 02:00 pm",resId:"L75jO3fVuv",asset:"East Ascension Gymnasium",facility:"East Ascension High School",transferDate:"11/23/25",destAcct:"acct_1ScWpNB3rReV834a",amount:400.00,discount:"N/A",status:"success",transferId:"tr_1ShHGzBPaTHg8GrQ8mL5kNpA",acctPayId:"py_1ShHGzBUbsUICInXr1K9rQuD",intentId:"pi_3SgPFyBPaTHg8GrQ1jMiHnBZ"},
  {id:"xY1zAbCdEf",updatedAt:"02/03/26 09:22 am",resId:"K93MNpR4w1",asset:"Prairieville Athletic Complex",facility:"Prairieville High School",transferDate:"pending",destAcct:"acct_1ScWpNB3rReV834a",amount:950.00,discount:"N/A",status:"failed",transferId:"--",acctPayId:"--",intentId:"pi_3Swl1YBPaTHg8GrQ2vGPMglW"},
];

/* ======== STYLES ======== */
const font="'Montserrat', sans-serif";
const TH={textAlign:"left",padding:"10px 14px",color:C.g400,fontWeight:700,fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",borderBottom:`1px solid ${C.g200}`};
const TD={padding:"12px 14px",fontSize:13};
const sel={padding:"9px 34px 9px 12px",border:`1px solid ${C.g300}`,borderRadius:8,fontSize:13,color:C.g600,background:C.w,appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239BA5B3' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",cursor:"pointer",fontWeight:600,fontFamily:font};
const btnP={background:C.blue,color:C.w,border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font,display:"inline-flex",alignItems:"center",gap:6};
const btnO={background:C.w,color:C.g600,border:`1px solid ${C.g300}`,borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font};
const pill=(a)=>({padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",border:"none",fontFamily:font,background:a?C.blue:C.g100,color:a?C.w:C.g500,transition:"all .15s"});
const statusBadge=(s)=>{const m={completed:{bg:C.greenL,c:C.green},failed:{bg:C.redL,c:C.red},pending:{bg:C.orangeL,c:C.orange},processing:{bg:C.blueL,c:C.blue},paid:{bg:C.greenL,c:C.green}};const x=m[s]||m.pending;return{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:20,background:x.bg,color:x.c,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em"}};

/* ======== COMPONENTS ======== */
function Card({children,style={},np}){return <div className="pp-card" style={{background:C.w,borderRadius:14,border:`1px solid ${C.g200}`,padding:np?0:24,boxShadow:"0 1px 3px rgba(0,0,0,0.04)",...style}}>{children}</div>}
function Sec({children,action}){return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><h3 style={{margin:0,fontSize:16,fontWeight:700,color:C.g800}}>{children}</h3>{action}</div>}
function Met({label,value,change,dir,sub,accent=C.blue}){
  return <Card style={{flex:1,minWidth:170,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:accent,opacity:0.06}}/>
    <div style={{fontSize:10,fontWeight:700,color:C.g400,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>{label}</div>
    <div style={{fontSize:28,fontWeight:800,color:C.g800,lineHeight:1.1}}>{value}</div>
    <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10}}>
      {change&&<span style={{fontSize:12,fontWeight:700,color:dir==="up"?C.green:dir==="down"?C.orange:C.g400}}>{dir==="up"?"↑":dir==="down"?"↓":"-"} {change}</span>}
      {sub&&<span style={{fontSize:11,color:C.g400}}>{sub}</span>}
    </div>
  </Card>
}
const Tip=({active,payload,label})=>{if(!active||!payload?.length)return null;return <div style={{background:C.g800,color:C.w,padding:"10px 14px",borderRadius:8,fontSize:12,fontFamily:font,boxShadow:"0 4px 14px rgba(0,0,0,0.2)"}}><div style={{fontWeight:700,marginBottom:4}}>{label}</div>{payload.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}><span style={{width:8,height:8,borderRadius:2,background:p.color}}/><span style={{opacity:0.7}}>{p.name}:</span><span style={{fontWeight:700}}>{typeof p.value==="number"?`$${p.value.toLocaleString()}`:p.value}</span></div>)}</div>};
function HC({v}){const i=v/6;return <td style={{width:42,height:34,textAlign:"center",fontSize:11,fontWeight:600,background:i===0?C.g100:`rgba(0,118,187,${.12+i*.7})`,color:i>.5?C.w:C.g600,borderRadius:4,border:`2px solid ${C.w}`}}>{v||""}</td>}

/* ======== SLIDE PANELS (preserved) ======== */
function SlidePanel({open,onClose,children,width=500}){if(!open)return null;return <><style>{`@keyframes slideIn{from{transform:translateX(100%);opacity:0.5}to{transform:translateX(0);opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}.slide-panel{animation:slideIn .32s cubic-bezier(.22,1,.36,1) forwards}.slide-overlay{animation:fadeIn .25s ease forwards}.slide-section{animation:slideUp .35s ease forwards;opacity:0}@media(max-width:768px){.slide-panel{width:100vw !important;max-width:100vw !important}}`}</style><div className="slide-overlay" onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.35)",backdropFilter:"blur(2px)",zIndex:199}}/><div className="slide-panel" style={{position:"fixed",top:0,right:0,width,maxWidth:"92vw",height:"100vh",background:C.w,boxShadow:"-8px 0 40px rgba(0,0,0,0.12), -1px 0 0 rgba(0,0,0,0.05)",zIndex:200,display:"flex",flexDirection:"column",fontFamily:font,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>{children}</div></>}

function CustomerPanel({cust,onClose}){if(!cust)return null;return <SlidePanel open={true} onClose={onClose} width={480}>
  <div style={{padding:"28px 30px",borderBottom:`1px solid ${C.g200}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{display:"flex",gap:16,alignItems:"center"}}><div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.green})`,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:20}}>{cust.photo}</div><div><div style={{fontSize:20,fontWeight:800,color:C.g800}}>{cust.n}</div><div style={{fontSize:12,color:C.g400,marginTop:2}}>Customer since {cust.since}</div></div></div><button onClick={onClose} style={{background:C.g100,border:"none",width:32,height:32,borderRadius:8,fontSize:16,color:C.g500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div>
  <div style={{flex:1,overflow:"auto"}}><div style={{padding:"20px 30px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{[["Email",cust.email],["Phone",cust.phone],["Total Spent",`$${cust.s.toLocaleString()}`],["Total Bookings",cust.b],["Favorite Asset",cust.fav],["Trend",cust.t==="up"?"↑ Increasing":cust.t==="down"?"↓ Decreasing":"- Stable"]].map(([l,v],i)=><div className="slide-section" key={l} style={{animationDelay:`${i*50+100}ms`,background:C.g50,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.g200}`}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{l}</div><div style={{fontSize:14,fontWeight:600,color:C.g700}}>{v}</div></div>)}</div>
  <div style={{padding:"8px 30px 20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{fontSize:14,fontWeight:700,color:C.g800}}>Reservation History</span><span style={{fontSize:11,color:C.g400}}>{cust.hist.length} total</span></div>{cust.hist.map((h,i)=><div className="slide-section" key={h.id} style={{animationDelay:`${i*60+400}ms`,display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:i<cust.hist.length-1?`1px solid ${C.g100}`:"none"}}><div style={{width:40,height:40,borderRadius:10,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:16}}>📅</span></div><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:C.g700}}>{h.asset}</div><div style={{fontSize:11,color:C.g400}}>{h.date} - {h.time}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:14,fontWeight:700,color:C.g800}}>${h.rev.toFixed(2)}</div><div style={{fontSize:10,color:C.g400,fontVariantNumeric:"tabular-nums"}}>#{h.id}</div></div></div>)}</div></div>
  <div style={{padding:"16px 30px 24px",borderTop:`1px solid ${C.g200}`,display:"flex",gap:10}}><button style={{...btnP,flex:1,justifyContent:"center"}}>📧 Send Email</button><button style={{...btnO,flex:1,display:"flex",justifyContent:"center",alignItems:"center",gap:6}}>📅 New Booking</button></div>
</SlidePanel>}

function ReservationPanel({res,onClose,approval}){
  if(!res&&!approval)return null;
  const a=approval||null;
  const name=a?a.contact:res?.c;
  const team=a?a.org:res?.team;
  const email=a?a.email:res?.email;
  const phone=a?a.phone:res?.phone;
  const campus=a?a.campus:res?.fac;
  const resId=a?a.id:res?.resId?`#${res.resId}`:`#${res?.id}`;
  const insActive=a?a.insActive:res?.insActive;
  const insStart=a?a.insStart:res?.insStart;
  const insEnd=a?a.insEnd:res?.insEnd;
  const insLimit=a?a.insLimit:"$300,000";
  const insNote=a?(!a.insActive?"Insurance expired. Please request updated certificate.":null):res?.insNote;
  const isPending=a?a.status==="pending":false;
  const bookings=a?a.bk:[{bid:res?.resId||res?.id,asset:res?.a,date:res?.dLong,time:res?.t,hours:2,rev:res?.r||0,activity:res?.activity,people:res?.people,amenities:res?.amenities,created:res?.created}];
  const totalRev=bookings.reduce((s,b)=>s+b.rev,0);
  const totalHrs=bookings.reduce((s,b)=>s+b.hours,0);
  const multiBook=bookings.length>1;

  const partName=a?a.org:res?.c;
  const cust=topCustData.find(c=>c.n===partName);

  const [selected,setSelected]=useState(()=>bookings.map(b=>b.bid));
  const [expandedBk,setExpandedBk]=useState(bookings[0]?.bid||null);
  const [selSupervisor,setSelSupervisor]=useState(null);
  const [reason,setReason]=useState("");
  const [panelTab,setPanelTab]=useState("details");

  const toggle=(bid)=>{setSelected(s=>s.includes(bid)?s.filter(x=>x!==bid):[...s,bid])};
  const allSel=selected.length===bookings.length;
  const noneSel=selected.length===0;
  const selRev=bookings.filter(b=>selected.includes(b.bid)).reduce((s,b)=>s+b.rev,0);

  /* Supervisor data with availability */
  const supervisors=usersData.filter(u=>u.role==="Site Admin").map(s=>{
    const schedules={
      "Coach Tony Richard":[{d:"02/06/2026",t:"3:30-5:30 PM",ev:"JV Basketball Practice"},{d:"02/07/2026",t:"8:00 AM-12:00 PM",ev:"Varsity Baseball Scrimmage"},{d:"02/09/2026",t:"6:00-8:00 PM",ev:"Open Gym Supervision"},{d:"02/11/2026",t:"5:00-7:00 PM",ev:"Volleyball Officials Meeting"},{d:"02/14/2026",t:"6:00-9:00 PM",ev:"Valentines Dance Supervision"}],
      "Denise Landry":[{d:"02/07/2026",t:"9:00 AM-4:00 PM",ev:"Wrestling District Meet"},{d:"02/10/2026",t:"6:00-8:00 PM",ev:"LA Tigers Practice"}],
      "Coach Ray Bourque":[{d:"02/06/2026",t:"5:00-7:00 PM",ev:"Elite Cheer (current)"},{d:"02/08/2026",t:"9:00 AM-12:00 PM",ev:"Competition Prep"},{d:"02/13/2026",t:"5:00-7:00 PM",ev:"Ascension Dance"}],
      "Amy Melancon":[{d:"02/07/2026",t:"8:00-10:00 AM",ev:"Gonzales FC Scrimmage"},{d:"02/09/2026",t:"7:30-9:00 PM",ev:"Gonzales FC Practice"},{d:"02/22/2026",t:"8:00 AM-12:00 PM",ev:"Field Day Setup"}],
    };
    const sched=schedules[s.name]||[];
    const bkDates=bookings.map(b=>b.date);
    const conflicts=sched.filter(x=>bkDates.includes(x.d));
    const nextEvent=sched.filter(x=>!conflicts.find(c=>c===x))[0];
    return {...s,sched,conflicts,nextEvent};
  });

  return <SlidePanel open={true} onClose={onClose} width={540}>
  {/* ===== HEADER ===== */}
  <div style={{padding:"20px 28px 0",borderBottom:`1px solid ${C.g200}`,flexShrink:0}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
      <div style={{display:"flex",gap:12,alignItems:"center"}}>
        <div style={{width:42,height:42,borderRadius:12,background:a?.color||C.blue,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:14,flexShrink:0}}>{a?.photo||team?.slice(0,2)||"--"}</div>
        <div>
          <div style={{fontSize:18,fontWeight:800,color:C.g800,lineHeight:1.2}}>{team||name}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:3,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:C.g500,fontFamily:"monospace"}}>{resId}</span>
            {isPending&&<span style={{fontSize:9,fontWeight:700,color:C.orange,background:C.orangeL,padding:"2px 8px",borderRadius:8}}>Pending</span>}
            {a&&a.status==="approved"&&<span style={{fontSize:9,fontWeight:700,color:C.green,background:C.greenL,padding:"2px 8px",borderRadius:8}}>Approved</span>}
            {a&&a.status==="denied"&&<span style={{fontSize:9,fontWeight:700,color:C.red,background:C.redL,padding:"2px 8px",borderRadius:8}}>Denied</span>}
          </div>
        </div>
      </div>
      <button onClick={onClose} style={{background:C.g100,border:"none",width:30,height:30,borderRadius:8,fontSize:14,color:C.g500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>&#10005;</button>
    </div>
    {/* Stats row */}
    <div style={{display:"flex",gap:0,margin:"0 -28px",borderTop:`1px solid ${C.g200}`}}>
      {[["Revenue",`$${totalRev.toLocaleString()}`],["Bookings",""+bookings.length],["Hours",totalHrs+"h"],["Campus",campus]].map(([l,v],i)=><div key={l} style={{flex:1,padding:"10px 12px",textAlign:"center",...(i<3?{borderRight:`1px solid ${C.g200}`}:{})}}>
        <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
        <div style={{fontSize:12,fontWeight:700,color:C.g800,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</div>
      </div>)}
    </div>
    {/* Tab nav */}
    <div style={{display:"flex",gap:0,margin:"0 -28px"}}>
      {[["details","Reservation"],["history",cust?`${partName} History (${cust.hist.length})`:"History"]].map(([k,l])=>
        <button key={k} onClick={()=>setPanelTab(k)} style={{flex:1,padding:"10px 0",fontSize:12,fontWeight:panelTab===k?700:500,color:panelTab===k?C.blue:C.g400,background:"none",border:"none",borderBottom:panelTab===k?`2px solid ${C.blue}`:"2px solid transparent",cursor:"pointer",fontFamily:font,transition:"all .12s"}}>{l}</button>
      )}
    </div>
  </div>

  <div style={{flex:1,overflow:"auto",WebkitOverflowScrolling:"touch"}}>

  {/* ===== TAB: RESERVATION DETAILS ===== */}
  {panelTab==="details"&&<>

    {/* -- Participant -- */}
    <div style={{padding:"16px 28px",borderBottom:`1px solid ${C.g200}`}}>
      <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Participant</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
        {[["Contact",name],["Organization",team],["Email",email],["Phone",phone]].map(([l,v])=><div key={l} style={{padding:"4px 0"}}>
          <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
          <div style={{fontSize:12,fontWeight:600,color:l==="Email"?C.blue:C.g700,marginTop:1}}>{v}</div>
        </div>)}
      </div>
      <div style={{display:"flex",gap:8,marginTop:10}}>
        <button style={{flex:1,padding:"7px 0",borderRadius:6,border:`1px solid ${C.g300}`,background:C.w,color:C.g600,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:font}}>View Insurance</button>
        <button style={{flex:1,padding:"7px 0",borderRadius:6,border:`1px solid ${C.g300}`,background:C.w,color:C.g600,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:font}}>View Residency</button>
      </div>
      {/* Insurance status */}
      <div style={{marginTop:8,display:"flex",alignItems:"center",gap:8,padding:"7px 12px",borderRadius:6,background:insActive?`${C.green}06`:`${C.red}06`,border:`1px solid ${insActive?`${C.green}18`:`${C.red}18`}`}}>
        <span style={{width:6,height:6,borderRadius:3,background:insActive?C.green:C.red,flexShrink:0}}/>
        <div style={{flex:1,fontSize:11,color:C.g600}}>
          <span style={{fontWeight:700,color:insActive?C.green:C.red}}>Insurance {insActive?"Active":"Expired"}</span>
          <span style={{color:C.g400}}> - {insStart} to {insEnd}</span>
          {insActive&&insLimit!=="N/A"&&<span style={{color:C.g400}}> - Coverage: {insLimit}</span>}
        </div>
      </div>
      {insNote&&<div style={{marginTop:4,padding:"6px 12px",borderRadius:6,background:`${C.red}06`,border:`1px solid ${C.red}15`,fontSize:11,fontWeight:600,color:C.red}}>{insNote}</div>}
    </div>

    {/* -- Bookings -- */}
    <div style={{padding:"16px 28px",borderBottom:`1px solid ${C.g200}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Bookings ({bookings.length})</div>
        {multiBook&&isPending&&<div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:10,color:C.g400}}>{selected.length}/{bookings.length}</span>
          <button onClick={()=>setSelected(allSel?[]:bookings.map(b=>b.bid))} style={{background:"none",border:"none",color:C.blue,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:font,padding:0}}>{allSel?"Deselect All":"Select All"}</button>
        </div>}
      </div>

      {bookings.map((b)=>{
        const isSel=selected.includes(b.bid);
        const isExp=expandedBk===b.bid;
        return <div key={b.bid} style={{marginBottom:6,borderRadius:8,border:`1px solid ${!isPending?C.g200:isSel?`${C.blue}30`:C.g200}`,background:!isPending?C.w:isSel?`${C.blue}03`:C.w,overflow:"hidden",transition:"all .12s"}}>
          <div style={{padding:"10px 12px",display:"flex",alignItems:"center",gap:8}}>
            {multiBook&&isPending&&<div onClick={(e)=>{e.stopPropagation();toggle(b.bid)}} style={{width:18,height:18,borderRadius:4,border:`2px solid ${isSel?C.blue:C.g300}`,background:isSel?C.blue:C.w,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all .1s"}}>
              {isSel&&<span style={{color:C.w,fontSize:10,fontWeight:800}}>&#10003;</span>}
            </div>}
            <div style={{flex:1,minWidth:0,cursor:"pointer"}} onClick={()=>setExpandedBk(isExp?null:b.bid)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.g800}}>{b.asset}</div>
                  <div style={{fontSize:10,color:C.g500,marginTop:1}}>{b.date} - {b.time} - {b.hours}h</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                  <span style={{fontSize:13,fontWeight:800,color:C.g800}}>${b.rev.toFixed(2)}</span>
                  <span style={{width:20,height:20,borderRadius:5,background:isExp?C.blue:C.g100,color:isExp?C.w:C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,transition:"all .1s"}}>{isExp?"\u2212":"+"}</span>
                </div>
              </div>
            </div>
          </div>
          {isExp&&<div style={{padding:"0 12px 10px",marginLeft:multiBook&&isPending?26:0}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:2,padding:"8px 10px",background:C.g50,borderRadius:6}}>
              {[["Activity",b.activity],["People",b.people],["Amenities",b.amenities||"N/A"],["Created",b.created],["Booking ID",b.bid],["Hours",b.hours+"h"]].map(([l,v])=><div key={l} style={{padding:"3px 0"}}>
                <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
                <div style={{fontSize:11,fontWeight:600,color:C.g700}}>{v}</div>
              </div>)}
            </div>
          </div>}
        </div>})}

      {/* Totals + discount */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0 0",marginTop:2}}>
        <span style={{fontSize:11,color:C.g400}}>
          {isPending&&multiBook?<>{selected.length} of {bookings.length} selected - ${selRev.toLocaleString()}</>:
          <>{bookings.length} booking{bookings.length>1?"s":""} - ${totalRev.toLocaleString()} total</>}
        </span>
      </div>
      <div style={{marginTop:8,display:"flex",gap:6}}>
        <input type="text" placeholder="Discount code" style={{flex:1,padding:"7px 10px",border:`1px solid ${C.g300}`,borderRadius:6,fontSize:11,fontFamily:font}}/>
        <button style={{background:C.blue,color:C.w,border:"none",borderRadius:6,padding:"7px 14px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:font}}>Apply</button>
      </div>
    </div>

    {/* -- Assign Supervisor -- */}
    <div style={{padding:"16px 28px",borderBottom:`1px solid ${C.g200}`}}>
      <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Assign Supervisor</div>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        {supervisors.map(s=>{
          const isSel=selSupervisor===s.name;
          const hasConflict=s.conflicts.length>0;
          return <div key={s.name} onClick={()=>setSelSupervisor(isSel?null:s.name)} style={{padding:"8px 10px",borderRadius:8,border:`1px solid ${isSel?C.blue:C.g200}`,background:isSel?`${C.blue}04`:C.w,cursor:"pointer",transition:"all .12s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:26,height:26,borderRadius:7,background:s.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:9,flexShrink:0}}>{s.initials}</div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:C.g800}}>{s.name}</div>
                  <div style={{fontSize:9,color:C.g400}}>{s.loc}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                {hasConflict
                  ?<span style={{fontSize:9,fontWeight:700,color:C.orange,background:C.orangeL,padding:"2px 6px",borderRadius:8}}>Busy ({s.conflicts.length})</span>
                  :<span style={{fontSize:9,fontWeight:700,color:C.green,background:C.greenL,padding:"2px 6px",borderRadius:8}}>Available</span>}
                {isSel&&<span style={{width:16,height:16,borderRadius:4,background:C.blue,color:C.w,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>&#10003;</span>}
              </div>
            </div>
            {isSel&&<div style={{marginTop:6,paddingTop:6,borderTop:`1px solid ${C.g100}`,fontSize:10}}>
              {hasConflict&&s.conflicts.map((c,ci)=><div key={ci} style={{padding:"3px 8px",borderRadius:4,background:C.orangeL,marginBottom:3,color:C.g600}}><span style={{fontWeight:700,color:C.orange}}>Conflict:</span> {c.ev} - {c.d} {c.t}</div>)}
              {s.sched.filter(ev=>!s.conflicts.includes(ev)).slice(0,3).map((ev,ei)=><div key={ei} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",color:C.g500}}>
                <span>{ev.ev}</span><span style={{color:C.g400}}>{ev.d}</span>
              </div>)}
              {s.sched.length>3+s.conflicts.length&&<div style={{color:C.g400,marginTop:2}}>+{s.sched.length-3-s.conflicts.length} more</div>}
            </div>}
          </div>})}
      </div>
    </div>

    {/* -- Notes -- */}
    {a?.notes&&<div style={{padding:"16px 28px"}}>
      <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Notes</div>
      <div style={{fontSize:12,color:C.g600,lineHeight:1.5,padding:"8px 12px",background:C.g50,borderRadius:6,border:`1px solid ${C.g200}`}}>{a.notes}</div>
    </div>}
  </>}

  {/* ===== TAB: PARTICIPANT HISTORY ===== */}
  {panelTab==="history"&&<>
    {cust?<>
      {/* Profile card */}
      <div style={{padding:"20px 28px",borderBottom:`1px solid ${C.g200}`,background:C.g50}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:44,height:44,borderRadius:14,background:a?.color||C.blue,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:16,flexShrink:0}}>{cust.photo}</div>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:C.g800}}>{cust.n}</div>
            <div style={{fontSize:11,color:C.g400}}>Member since {cust.since}</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["Lifetime Bookings",""+cust.b],["Lifetime Revenue","$"+cust.s.toLocaleString()],["Trend",cust.t==="up"?"Increasing":cust.t==="down"?"Decreasing":"Stable"]].map(([l,v])=><div key={l} style={{padding:"8px 10px",background:C.w,borderRadius:6,border:`1px solid ${C.g200}`}}>
            <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div style={{fontSize:13,fontWeight:700,color:l==="Trend"?(cust.t==="up"?C.green:cust.t==="down"?C.orange:C.g600):C.g800,marginTop:2}}>{v}</div>
          </div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginTop:10}}>
          {[["Email",cust.email],["Phone",cust.phone],["Favorite Facility",cust.fav],["Avg per Booking","$"+(cust.s/cust.b).toFixed(0)]].map(([l,v])=><div key={l} style={{padding:"4px 0"}}>
            <div style={{fontSize:8,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div style={{fontSize:11,fontWeight:600,color:l==="Email"?C.blue:C.g700,marginTop:1}}>{v}</div>
          </div>)}
        </div>
      </div>
      {/* Booking list */}
      <div style={{padding:"12px 28px 8px"}}>
        <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Past Reservations ({cust.hist.length})</div>
      </div>
      {cust.hist.map((h,i)=><div key={h.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 28px",borderBottom:`1px solid ${C.g100}`,background:i%2===0?C.w:C.g50}}>
        <div style={{width:32,height:32,borderRadius:8,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>&#128197;</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:12,fontWeight:600,color:C.g700}}>{h.asset}</div>
          <div style={{fontSize:10,color:C.g400}}>{h.date} - {h.time}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:13,fontWeight:700,color:C.g800}}>${h.rev.toFixed(2)}</div>
          <div style={{fontSize:9,color:C.g400,fontFamily:"monospace"}}>#{h.id}</div>
        </div>
      </div>)}
      {/* Contact actions */}
      <div style={{padding:"16px 28px",borderTop:`1px solid ${C.g200}`,display:"flex",gap:8}}>
        <button style={{flex:1,padding:"9px 0",borderRadius:6,border:`1px solid ${C.g300}`,background:C.w,color:C.blue,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:font}}>Email Participant</button>
        <button style={{flex:1,padding:"9px 0",borderRadius:6,border:`1px solid ${C.g300}`,background:C.w,color:C.g600,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:font}}>New Booking</button>
      </div>
    </>:<div style={{padding:"60px 28px",textAlign:"center",color:C.g400}}>
      <div style={{fontSize:24,marginBottom:8}}>&#128203;</div>
      <div style={{fontSize:13,fontWeight:600}}>No history found</div>
      <div style={{fontSize:11,marginTop:4}}>This participant doesn't have any past bookings on record.</div>
    </div>}
  </>}

  </div>

  {/* ===== STICKY FOOTER ===== */}
  {isPending&&panelTab==="details"?<div style={{padding:"12px 28px 18px",borderTop:`1px solid ${C.g200}`,background:C.w,flexShrink:0}}>
    <textarea value={reason} onChange={e=>setReason(e.target.value)} placeholder="Add a reason (optional)" rows={2} style={{width:"100%",padding:"8px 10px",border:`1px solid ${C.g300}`,borderRadius:6,fontSize:11,fontFamily:font,resize:"vertical",color:C.g700,marginBottom:8}}/>
    {multiBook&&!allSel&&selected.length>0&&<div style={{padding:"6px 10px",borderRadius:6,background:`${C.orange}06`,border:`1px solid ${C.orange}15`,marginBottom:8,fontSize:10,color:C.g600,lineHeight:1.4}}>
      Approving {selected.length} selected booking{selected.length>1?"s":""} will automatically <span style={{fontWeight:700,color:C.red}}>reject</span> the {bookings.length-selected.length} unselected.
    </div>}
    <div style={{display:"flex",gap:8}}>
      <button disabled={noneSel} onClick={()=>{triggerApproval(a.id,"approved");onClose()}} style={{flex:1,padding:"11px",borderRadius:8,border:"none",background:noneSel?C.g200:C.green,color:noneSel?C.g400:C.w,fontSize:13,fontWeight:700,cursor:noneSel?"not-allowed":"pointer",fontFamily:font,transition:"all .15s"}}>
        {allSel?"Approve All"
          :selected.length>0?`Approve ${selected.length} of ${bookings.length}`
          :"Select Bookings to Approve"}
      </button>
      <button onClick={()=>{triggerApproval(a.id,"denied");onClose()}} style={{padding:"11px 18px",borderRadius:8,border:`1px solid ${C.g300}`,background:C.w,color:C.red,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:font}}>Reject{allSel?" All":""}</button>
    </div>
  </div>
  :panelTab==="details"?<div style={{padding:"12px 28px 18px",borderTop:`1px solid ${C.g200}`,background:C.w,flexShrink:0}}>
    <button style={{width:"100%",padding:"11px",borderRadius:8,border:`1px solid ${C.g300}`,background:C.w,color:C.red,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:font}}>Cancel Reservation</button>
  </div>:null}
</SlidePanel>}

/* ======== DASHBOARD ======== */
function Dashboard(){
  const [assetRange,setAssetRange]=useState("month");
  const [selCust,setSelCust]=useState(null);
  const [selRes,setSelRes]=useState(null);
  const [selApproval,setSelApproval]=useState(null);
  const [dateRange,setDateRange]=useState("month");
  const {approvals}=useApprovals();
  const pendingApprovals=approvals.filter(a=>a.status==="pending");
  const ap=assetPerfData[assetRange];
  const totalFacRev=facMix.reduce((s,f)=>s+f.v,0);
  const todayRes=upcoming.filter(x=>x.d==="2/6/2026");
  const unreadNotifs=notifs.filter(n=>!n.read).length;

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {selCust!==null&&<CustomerPanel cust={topCustData[selCust]} onClose={()=>setSelCust(null)}/>}
    {selRes!==null&&<ReservationPanel res={upcoming[selRes]} onClose={()=>setSelRes(null)}/>}
    {selApproval!==null&&<ReservationPanel approval={selApproval} onClose={()=>setSelApproval(null)}/>}

    {/* Welcome Banner */}
    <div style={{background:`linear-gradient(135deg,${C.blue},${C.blueDk})`,borderRadius:16,padding:"24px 30px",color:C.w,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
      <div>
        <div style={{fontSize:20,fontWeight:800,marginBottom:6}}>Good morning, Marcus</div>
        <div style={{fontSize:13,opacity:.85,lineHeight:1.5}}>
          You have <span style={{fontWeight:800}}>{todayRes.length} reservation{todayRes.length!==1?"s":""} today</span>
          {pendingApprovals.length>0&&<>, <span style={{fontWeight:800,color:"#FCD34D"}}>{pendingApprovals.length} approval{pendingApprovals.length!==1?"s":""} pending</span></>}
          {unreadNotifs>0&&<>, and <span style={{fontWeight:800,color:C.orange}}>{unreadNotifs} alert{unreadNotifs!==1?"s":""}</span></>}.
          {" "}February revenue is tracking <span style={{fontWeight:700}}>18% above</span> last month.
        </div>
      </div>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        <div style={{display:"flex",gap:4,background:"rgba(255,255,255,0.12)",borderRadius:10,padding:3}}>
          {["day","week","month","year"].map(p=><button key={p} onClick={()=>setDateRange(p)} style={{padding:"6px 14px",borderRadius:8,fontSize:11,fontWeight:700,border:"none",cursor:"pointer",fontFamily:font,background:dateRange===p?"rgba(255,255,255,0.95)":"transparent",color:dateRange===p?C.blue:"rgba(255,255,255,0.7)",transition:"all .15s"}}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>)}
        </div>
        <button style={{background:"rgba(255,255,255,0.15)",color:C.w,border:"1px solid rgba(255,255,255,0.25)",borderRadius:10,padding:"8px 18px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font}}>+ New Reservation</button>
      </div>
    </div>

    {/* Pending Approvals Banner - prominent on dashboard */}
    {pendingApprovals.length>0&&<Card style={{border:`1px solid ${C.orange}25`,background:`linear-gradient(135deg,${C.orange}06,${C.w})`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:38,height:38,borderRadius:10,background:`${C.orange}15`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:20}}>✋</span></div>
          <div><div style={{fontSize:15,fontWeight:800,color:C.g800}}>Pending Approvals ({pendingApprovals.length})</div><div style={{fontSize:12,color:C.g500}}>Reservation requests awaiting your review</div></div>
        </div>
        <button onClick={()=>globalSetTab("Rentals")} style={{...btnO,color:C.orange,borderColor:`${C.orange}40`,fontSize:12}}>View All in Rentals</button>
      </div>
      {pendingApprovals.map((a,i)=><div key={a.id} style={{padding:"14px 0",borderTop:i===0?`1px solid ${C.g200}`:`1px solid ${C.g100}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:12,alignItems:"center",flex:1,minWidth:0}}>
          <div style={{width:36,height:36,borderRadius:10,background:a.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:12,flexShrink:0}}>{a.photo}</div>
          <div style={{minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <span style={{fontSize:13,fontWeight:700,color:C.g800}}>{a.org}</span>
              <span style={{fontSize:10,fontWeight:700,color:C.blue,fontFamily:"monospace"}}>{a.id}</span>
              {a.expiresIn==="0 Days"&&<span style={{background:C.red,color:C.w,padding:"1px 6px",borderRadius:4,fontSize:9,fontWeight:800}}>EXPIRES TODAY</span>}
            </div>
            <div style={{fontSize:12,color:C.g500,marginTop:1}}>{a.bk[0].asset} - {a.bk[0].date} {a.bk[0].time}{a.bk.length>1?` + ${a.bk.length-1} more`:""}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <span style={{fontSize:15,fontWeight:800,color:C.g800}}>${a.bk.reduce((s,b)=>s+b.rev,0).toLocaleString()}</span>
          <button onClick={()=>setSelApproval(a)} style={{background:C.w,color:C.blue,border:`1px solid ${C.g300}`,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:font}}>View Details</button>
          <button onClick={()=>triggerApproval(a.id,"approved")} style={{background:C.green,color:C.w,border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font}}>Approve</button>
          <button onClick={()=>triggerApproval(a.id,"denied")} style={{background:C.w,color:C.red,border:`1px solid ${C.red}30`,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font}}>Deny</button>
        </div>
      </div>)}
    </Card>}

    {/* Metrics */}
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      <Met label="YTD Revenue" value="$61,011" change="+28%" dir="up" sub="vs last year" accent={C.green}/>
      <Met label="This Month" value="$8,761" change="+18.4%" dir="up" sub="projected $14.2k" accent={C.blue}/>
      <Met label="Reservations" value="192" change="+34" dir="up" sub="YTD" accent={C.blue}/>
      <Met label="Avg / Booking" value="$318" change="+$42" dir="up" sub="vs $276 prior" accent={C.orange}/>
      <Met label="Utilization" value="52%" change="+9%" dir="up" sub="all assets" accent={C.green}/>
    </div>

    {/* Charts */}
    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
      <Card style={{flex:2,minWidth:380}}><Sec>Revenue Trend (7 Months)</Sec><ResponsiveContainer width="100%" height={230}><AreaChart data={monthlyRev}><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.blue} stopOpacity={.2}/><stop offset="100%" stopColor={C.blue} stopOpacity={.01}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke={C.g200} vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}} tickFormatter={v=>`$${(v/1000).toFixed(1)}k`}/><Tooltip content={<Tip/>}/><Area type="monotone" dataKey="r" name="Revenue" stroke={C.blue} strokeWidth={2.5} fill="url(#gr)" dot={{r:4,fill:C.blue,strokeWidth:2,stroke:C.w}} activeDot={{r:6,stroke:C.blue,strokeWidth:2,fill:C.w}}/></AreaChart></ResponsiveContainer></Card>
      <Card style={{flex:1,minWidth:260}}><Sec>This Month vs Last</Sec><ResponsiveContainer width="100%" height={230}><BarChart data={weeklyTrend} barGap={4}><CartesianGrid strokeDasharray="3 3" stroke={C.g200} vertical={false}/><XAxis dataKey="w" axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}} tickFormatter={v=>`$${v}`}/><Tooltip content={<Tip/>}/><Bar dataKey="l" name="Last Mo" fill={C.g300} radius={[4,4,0,0]} barSize={14}/><Bar dataKey="r" name="This Mo" fill={C.blue} radius={[4,4,0,0]} barSize={14}/></BarChart></ResponsiveContainer></Card>
    </div>

    {/* Insights */}
    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
      {[{icon:"💡",label:"Insight",color:C.blue,text:"Saturday mornings are your highest demand window across Dutchtown and Prairieville. Consider premium pricing during peak hours to increase revenue by an estimated 15-20%."},
        {icon:"📈",label:"Opportunity",color:C.green,text:"Donaldsonville HS facilities have only 31% utilization. Targeted outreach to Donaldsonville-area youth leagues could add ~$2,000/mo in revenue."},
        {icon:"⚠️",label:"Action Needed",color:C.orange,text:"Gonzales FC payment failed ($950). Plus, a RankOne sync conflict - Varsity Basketball playoffs overlap a PP booking at Dutchtown Gym on 2/18."}
      ].map(x=><Card key={x.label} style={{flex:1,minWidth:240,background:`linear-gradient(135deg,${x.color}08,${C.blue}06)`,border:`1px solid ${x.color}20`}}><div style={{fontSize:10,fontWeight:700,color:x.color,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>{x.icon} {x.label}</div><div style={{fontSize:13,fontWeight:600,color:C.g700,lineHeight:1.5}}>{x.text}</div></Card>)}
    </div>

    {/* Facility Revenue + Asset Perf */}
    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
      <Card style={{flex:1,minWidth:300}}><Sec>Revenue by Campus</Sec>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}><ResponsiveContainer width={150} height={150}><PieChart><Pie data={facMix} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="v" stroke="none">{facMix.map((e,i)=><Cell key={i} fill={e.c}/>)}</Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer><div style={{flex:1}}>{facMix.map(f=><div key={f.n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{width:10,height:10,borderRadius:3,background:f.c,flexShrink:0}}/><div><div style={{fontSize:13,fontWeight:600,color:C.g700}}>{f.n}</div><div style={{fontSize:11,color:C.g400}}>${f.v.toLocaleString()} - {Math.round(f.v/totalFacRev*100)}%</div></div></div>)}</div></div>
        <div style={{borderTop:`1px solid ${C.g200}`,paddingTop:16}}><div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12}}>Campus Breakdown</div>{facMix.map(f=><div key={f.n} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:12,fontWeight:700,color:C.g700}}>{f.n}</span><span style={{fontSize:12,fontWeight:800,color:C.g800}}>${f.v.toLocaleString()}</span></div><div style={{width:"100%",height:6,background:C.g100,borderRadius:3,overflow:"hidden",marginBottom:6}}><div style={{width:`${(f.v/totalFacRev)*100}%`,height:"100%",background:f.c,borderRadius:3,transition:"width .4s"}}/></div><div style={{display:"flex",gap:16,fontSize:11,color:C.g400}}><span>{f.assets} assets</span><span>{f.bookings} bookings</span><span>Top: {f.topAsset}</span></div></div>)}<div style={{marginTop:12,padding:"12px 16px",background:C.g50,borderRadius:10,border:`1px solid ${C.g200}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total Revenue</div><div style={{fontSize:20,fontWeight:800,color:C.g800,marginTop:2}}>${totalFacRev.toLocaleString()}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.g400}}>Across {facMix.length} campuses</div><div style={{fontSize:11,color:C.g400}}>{facMix.reduce((s,f)=>s+f.assets,0)} total assets</div></div></div></div>
      </Card>
      <Card style={{flex:1.3,minWidth:340}}><Sec action={<div style={{display:"flex",gap:4}}>{["day","week","month","year"].map(p=><button key={p} onClick={()=>setAssetRange(p)} style={pill(assetRange===p)}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>)}</div>}>Asset Performance</Sec>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Asset","Revenue","Bookings","Utilization"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{ap.map((x,i)=><tr key={x.a} style={{background:i%2===0?C.g50:C.w}}><td style={{...TD,fontWeight:600,color:C.g700}}>{x.a}</td><td style={{...TD,fontWeight:700,color:C.g800}}>${x.r.toFixed(2)}</td><td style={TD}>{x.b}</td><td style={TD}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:56,height:6,background:C.g200,borderRadius:3,overflow:"hidden"}}><div style={{width:`${x.u}%`,height:"100%",background:x.u>60?C.green:x.u>40?C.blue:C.orange,borderRadius:3,transition:"width .3s"}}/></div><span style={{fontSize:11,fontWeight:700,color:C.g600}}>{x.u}%</span></div></td></tr>)}</tbody></table>
        <div style={{marginTop:14,padding:"10px 14px",background:C.g50,borderRadius:8,display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:C.g400}}>Total ({assetRange})</span><span style={{fontWeight:800,color:C.g800}}>${ap.reduce((s,x)=>s+x.r,0).toFixed(2)}</span></div>
      </Card>
    </div>

    {/* Heatmap + Top Customers */}
    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
      <Card style={{flex:1.5,minWidth:380}}><Sec>Booking Demand Heatmap</Sec><p style={{fontSize:11,color:C.g400,margin:"-8px 0 12px"}}>Bookings by day/time - identify peak demand</p><table style={{width:"100%",borderCollapse:"separate",borderSpacing:3}}><thead><tr><th/>{["M","T","W","Th","F","Sa","Su"].map(d=><th key={d} style={{fontSize:10,color:C.g400,fontWeight:700,textAlign:"center"}}>{d}</th>)}</tr></thead><tbody>{heatmap.map(r=><tr key={r.h}><td style={{fontSize:10,color:C.g500,fontWeight:600,padding:"2px 6px",whiteSpace:"nowrap"}}>{r.h}</td>{r.d.map((v,i)=><HC key={i} v={v}/>)}</tr>)}</tbody></table><div style={{display:"flex",alignItems:"center",gap:5,marginTop:10,fontSize:10,color:C.g400}}><span>Low</span>{[.1,.3,.5,.7,.85].map((o,i)=><span key={i} style={{width:18,height:9,borderRadius:2,background:`rgba(0,118,187,${o})`}}/>)}<span>High</span></div></Card>
      <Card style={{flex:1,minWidth:280}}><Sec action={<span style={{fontSize:11,color:C.g400}}>Click to expand</span>}>Top Organizations</Sec>{topCustData.map((c,i)=><div key={c.n} onClick={()=>setSelCust(i)} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 4px",borderBottom:i<4?`1px solid ${C.g100}`:"none",cursor:"pointer",borderRadius:8,transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.blueL} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{width:36,height:36,borderRadius:12,background:`linear-gradient(135deg,${[C.blue,C.green,C.orange,C.blueDk,C.g500][i]},${[C.blueDk,C.blue,C.blueDk,C.green,C.g600][i]})`,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:13,flexShrink:0}}>{c.photo}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:C.g700}}>{c.n}</div><div style={{fontSize:11,color:C.g400}}>{c.b} bookings - {c.fav}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:14,fontWeight:800,color:C.g800}}>${c.s.toLocaleString()}</div><span style={{fontSize:12,fontWeight:700,color:c.t==="up"?C.green:c.t==="down"?C.orange:C.g400}}>{c.t==="up"?"↑":c.t==="down"?"↓":"-"}</span></div></div>)}</Card>
    </div>

    {/* Upcoming */}
    <Card><Sec action={<button style={btnP}><span style={{fontSize:15}}>+</span> Create Reservation</button>}>Upcoming Reservations</Sec><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Res #","Asset","Customer","Date","Time","Revenue",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{upcoming.map((x,i)=><tr key={x.id} style={{background:i%2===0?C.g50:C.w,cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.blueL} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.g50:C.w}><td style={{...TD,fontWeight:700,color:C.blue,fontVariantNumeric:"tabular-nums"}}>{x.id}</td><td style={{...TD,fontWeight:600,color:C.g700}}>{x.a}</td><td style={{...TD,color:C.g600}}>{x.c}</td><td style={{...TD,color:C.g600}}>{x.d}</td><td style={{...TD,color:C.g600}}>{x.t}</td><td style={{...TD,fontWeight:700,color:C.g800}}>${x.r.toFixed(2)}</td><td style={TD}><button onClick={e=>{e.stopPropagation();setSelRes(i)}} style={{...btnO,padding:"5px 12px",fontSize:12}}>View</button></td></tr>)}</tbody></table></div></Card>
  </div>
}

/* ======== RENTALS (sub-tabs: Locations, Reservations, Approvals) ======== */
function Rentals(){
  const [subTab,setSubTab]=useState("reservations");
  const [view,setView]=useState("cal");
  const [campusFilt,setCampusFilt]=useState("all");
  const [srcFilt,setSrcFilt]=useState("all");
  const [approvalFilt,setApprovalFilt]=useState("all");
  const [expandedApproval,setExpandedApproval]=useState(null);
  const [selApproval,setSelApproval]=useState(null);
  const [selRes,setSelRes]=useState(null);
  const dw=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const days=[...Array(6).fill(null),...Array.from({length:28},(_,i)=>i+1)];
  const wks=[];for(let i=0;i<days.length;i+=7)wks.push(days.slice(i,i+7));
  const ppCount=Object.values(calEvents).flat().filter(e=>e.src==="pp").length;
  const syncCount=Object.values(calEvents).flat().filter(e=>e.src!=="pp").length;
  const {approvals:approvalsData}=useApprovals();
  const pendingApprovals=approvalsData.filter(a=>a.status==="pending");
  const filteredApprovals=approvalFilt==="all"?approvalsData:approvalsData.filter(a=>a.status===approvalFilt);

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {selApproval!==null&&<ReservationPanel approval={selApproval} onClose={()=>setSelApproval(null)}/>}
    {selRes!==null&&<ReservationPanel res={upcoming[selRes]} onClose={()=>setSelRes(null)}/>}
    {/* Sub-tab navigation */}
    <div style={{display:"flex",gap:0,borderBottom:`2px solid ${C.g200}`}}>
      {[["locations","Locations",null],["reservations","Reservations",null],["approvals","Approvals",pendingApprovals.length]].map(([k,l,badge])=>
        <button key={k} onClick={()=>setSubTab(k)} style={{padding:"12px 24px",fontSize:14,fontWeight:subTab===k?700:500,color:subTab===k?C.g800:C.g500,background:"none",border:"none",borderBottom:subTab===k?`2px solid ${k==="approvals"&&pendingApprovals.length>0?C.orange:C.blue}`:"2px solid transparent",marginBottom:-2,cursor:"pointer",fontFamily:font,position:"relative",display:"flex",alignItems:"center",gap:6}}>
          {l}
          {badge>0&&<span style={{background:C.red,color:C.w,fontSize:10,fontWeight:800,padding:"1px 6px",borderRadius:8,minWidth:18,textAlign:"center"}}>{badge}</span>}
        </button>
      )}
    </div>

    {/* ---- LOCATIONS ---- */}
    {subTab==="locations"&&<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:14,color:C.g400}}>🔍</span><input type="text" placeholder="Search..." style={{padding:"9px 14px 9px 32px",border:`1px solid ${C.g300}`,borderRadius:8,fontSize:13,width:200,fontFamily:font}}/></div>
        <button style={btnP}>+ Add Location</button>
      </div>
      <Card>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Active","Name","Assets","Status","Last Updated","Hourly Rate","Action"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{campuses.map((c,i)=><tr key={c.id} style={{background:i%2===0?C.g50:C.w}}>
            <td style={TD}><div style={{width:38,height:20,borderRadius:10,background:C.green,position:"relative",cursor:"pointer"}}><div style={{width:14,height:14,borderRadius:"50%",background:C.w,position:"absolute",top:3,right:3,boxShadow:"0 1px 2px rgba(0,0,0,.2)"}}/></div></td>
            <td style={{...TD,fontWeight:700,color:C.g700}}>{c.name}</td>
            <td style={TD}><span style={{color:C.blue,fontWeight:700,cursor:"pointer"}}>{[3,3,2,2,2][i]}</span></td>
            <td style={TD}><span style={statusBadge("completed")}>Published</span></td>
            <td style={{...TD,color:C.g500}}>02/04/2026</td>
            <td style={{...TD,color:C.g500}}>-</td>
            <td style={TD}><button style={{background:C.green,color:C.w,border:"none",borderRadius:8,padding:"6px 16px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font}}>Actions</button></td>
          </tr>)}</tbody>
        </table>
      </Card>
    </>}

    {/* ---- RESERVATIONS ---- */}
    {subTab==="reservations"&&<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <select value={campusFilt} onChange={e=>setCampusFilt(e.target.value)} style={sel}><option value="all">All Campuses</option>{campuses.map(c=><option key={c.id} value={c.short}>{c.short}</option>)}</select>
          <div style={{display:"flex",gap:4,background:C.g100,borderRadius:10,padding:3}}>{[["all","All Events"],["pp","PP Bookings"],["synced","Synced Only"]].map(([k,l])=><button key={k} onClick={()=>setSrcFilt(k)} style={pill(srcFilt===k)}>{l}</button>)}</div>
        </div>
        <div style={{display:"flex",gap:10}}>{[["cal","Calendar"],["list","List View"]].map(([k,l])=><button key={k} onClick={()=>setView(k)} style={{...btnO,...(view===k?{background:C.blue,color:C.w,border:"none"}:{})}}>{l}</button>)}<button style={btnP}>+ New Reservation</button></div>
      </div>
      {/* Legend + sync status */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",gap:14,alignItems:"center",fontSize:11,color:C.g400,flexWrap:"wrap"}}>
          <span style={{fontWeight:700}}>Sources:</span>
          {[["🟢","PP - PracticePlan"],["📅","Google Calendar"],["🏟","RankOne Athletics"],["📧","Outlook"]].map(([ic,n])=><div key={n} style={{display:"flex",alignItems:"center",gap:4}}><span>{ic}</span><span style={{fontWeight:600}}>{n}</span></div>)}
        </div>
        <div style={{display:"flex",gap:12,fontSize:11,color:C.g400}}>
          <span><span style={{fontWeight:800,color:C.green}}>{ppCount}</span> PP bookings</span>
          <span><span style={{fontWeight:800,color:C.g600}}>{syncCount}</span> synced events</span>
        </div>
      </div>
      {view==="cal"?<Card np>
        <div style={{padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.g200}`}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}><button style={{...btnO,padding:"5px 10px"}}>‹</button><span style={{fontSize:16,fontWeight:700,color:C.g800}}>February 2026</span><button style={{...btnO,padding:"5px 10px"}}>›</button></div>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:11,color:C.g400}}>Ascension Parish School District</span><img src={LOGO} alt="" style={{height:18,opacity:.35}}/></div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{dw.map(d=><th key={d} style={{padding:10,textAlign:"center",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",borderBottom:`1px solid ${C.g200}`}}>{d}</th>)}</tr></thead>
          <tbody>{wks.map((wk,wi)=><tr key={wi}>{wk.map((day,di)=>{const isT=day===6;
            let evts=day?calEvents[day]||[]:[];
            if(srcFilt==="pp")evts=evts.filter(e=>e.src==="pp");
            else if(srcFilt==="synced")evts=evts.filter(e=>e.src!=="pp");
            return <td key={di} style={{height:evts.length>1?Math.max(84,48+evts.length*28):84,verticalAlign:"top",borderBottom:`1px solid ${C.g100}`,borderRight:di<6?`1px solid ${C.g100}`:"none",background:!day?C.g50:isT?C.blueL:C.w,padding:2,width:"14.28%"}}>
              {day&&<div style={{padding:2}}>
                <span style={{fontSize:11,fontWeight:isT?800:500,color:isT?C.blue:C.g600,background:isT?`${C.blue}18`:"none",borderRadius:5,padding:isT?"1px 5px":0,display:"inline-block",marginBottom:1}}>{day}</span>
                {evts.slice(0,3).map((ev,ei)=>{const isPP=ev.src==="pp";return <div key={ei} style={{background:isPP?ev.c:ev.c,color:C.w,borderRadius:4,padding:"2px 5px",fontSize:9,lineHeight:1.25,marginTop:1,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",borderLeft:isPP?"3px solid rgba(255,255,255,0.6)":"none",opacity:isPP?1:0.55}}><div style={{fontWeight:700}}>{ev.l}</div><div style={{opacity:.85,display:"flex",alignItems:"center",gap:3}}>{ev.t} <span style={{fontSize:7}}>- {ev.a}</span></div></div>})}
                {evts.length>3&&<div style={{fontSize:9,color:C.g400,fontWeight:700,marginTop:1,paddingLeft:2}}>+{evts.length-3} more</div>}
              </div>}</td>})}</tr>)}</tbody>
        </table>
      </Card>:<Card>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Source","Res #","Facility","Campus","Organization","Date","Time","Revenue","Status",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{upcoming.map((x,i)=><tr key={x.id} style={{background:i%2===0?C.g50:C.w}}><td style={TD}><span title="PracticePlan Booking">🟢</span></td><td style={{...TD,fontWeight:700,color:C.blue}}>{x.id}</td><td style={{...TD,fontWeight:600,color:C.g700}}>{x.a}</td><td style={{...TD,color:C.g500,fontSize:12}}>{x.fac}</td><td style={{...TD,color:C.g600}}>{x.c}</td><td style={{...TD,color:C.g600}}>{x.d}</td><td style={{...TD,color:C.g600}}>{x.t}</td><td style={{...TD,fontWeight:700}}>${x.r.toFixed(2)}</td><td style={TD}><span style={statusBadge("completed")}>confirmed</span></td><td style={TD}><button onClick={()=>setSelRes(i)} style={{...btnO,padding:"5px 12px",fontSize:12}}>View</button></td></tr>)}</tbody>
        </table>
      </Card>}
    </>}

    {/* ---- APPROVALS ---- */}
    {subTab==="approvals"&&<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:4,background:C.g100,borderRadius:10,padding:3}}>{[["all","All"],["pending","Pending"],["approved","Approved"],["denied","Denied"]].map(([k,l])=><button key={k} onClick={()=>setApprovalFilt(k)} style={pill(approvalFilt===k)}>{l}</button>)}</div>
          <div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:14,color:C.g400}}>🔍</span><input type="text" placeholder="Search by customer..." style={{padding:"9px 14px 9px 32px",border:`1px solid ${C.g300}`,borderRadius:8,fontSize:13,width:200,fontFamily:font}}/></div>
        </div>
        <ExportBtns/>
      </div>

      {/* Approval cards */}
      {filteredApprovals.map((a,i)=>{const totalRev=a.bk.reduce((s,b)=>s+b.rev,0);const totalHrs=a.bk.reduce((s,b)=>s+b.hours,0);return <Card key={a.id} style={{border:a.status==="pending"&&a.expiresIn==="0 Days"?`1px solid ${C.red}30`:a.status==="pending"?`1px solid ${C.orange}25`:`1px solid ${C.g200}`,background:a.status==="pending"&&a.expiresIn==="0 Days"?`${C.red}03`:a.status==="pending"?`${C.orange}03`:C.w}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16,flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:14,alignItems:"flex-start",flex:1,minWidth:0}}>
            <div style={{width:44,height:44,borderRadius:12,background:a.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:14,flexShrink:0}}>{a.photo}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                <span style={{fontSize:15,fontWeight:800,color:C.g800}}>{a.org}</span>
                <span style={{fontSize:11,fontWeight:700,color:C.blue,fontFamily:"monospace",background:C.blueL,padding:"2px 8px",borderRadius:4}}>{a.id}</span>
                <span style={{...statusBadge(a.status==="approved"?"completed":a.status==="denied"?"failed":"processing"),fontSize:10,padding:"2px 8px"}}><span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>{a.status}</span>
                {a.bk.length>1&&<span style={{fontSize:10,fontWeight:700,color:C.g600,background:C.g100,padding:"2px 8px",borderRadius:4}}>{a.bk.length} bookings</span>}
                {a.status==="pending"&&a.expiresIn==="0 Days"&&<span style={{background:C.red,color:C.w,padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:800}}>EXPIRES TODAY</span>}
                {a.status==="pending"&&a.expiresIn!=="0 Days"&&<span style={{fontSize:11,color:C.orange,fontWeight:600}}>Expires in {a.expiresIn}</span>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8,margin:"8px 0"}}>
                {[["Asset",a.bk[0].asset],["Campus",a.campus],["Dates",a.bk.length===1?a.bk[0].date:`${a.bk[0].date} + ${a.bk.length-1} more`],["Hours",totalHrs+"h total"],["Revenue","$"+totalRev.toLocaleString()],["Submitted",a.submitted]].map(([l,v])=><div key={l}>
                  <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
                  <div style={{fontSize:13,fontWeight:600,color:C.g700}}>{v}</div>
                </div>)}
              </div>
              {a.notes&&<div style={{fontSize:12,color:C.g500,fontStyle:"italic",marginTop:4,padding:"8px 12px",background:C.g50,borderRadius:6,border:`1px solid ${C.g100}`}}>{a.notes}</div>}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}}>
            <div style={{fontSize:24,fontWeight:900,color:C.g800}}>${totalRev.toLocaleString()}</div>
            {a.status==="pending"&&<div style={{display:"flex",gap:6}}>
              <button onClick={()=>triggerApproval(a.id,"approved")} style={{background:C.green,color:C.w,border:"none",borderRadius:8,padding:"9px 22px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font}}>Approve</button>
              <button onClick={()=>triggerApproval(a.id,"denied")} style={{background:C.w,color:C.red,border:`1px solid ${C.red}30`,borderRadius:8,padding:"9px 22px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font}}>Deny</button>
            </div>}
            <button onClick={()=>setSelApproval(a)} style={{...btnO,fontSize:12,padding:"7px 16px",color:C.blue,borderColor:`${C.blue}40`}}>View Details</button>
            <button onClick={()=>setExpandedApproval(expandedApproval===a.id?null:a.id)} style={{background:"none",border:"none",color:C.blue,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:font,padding:0,marginTop:2}}>{expandedApproval===a.id?"Hide Contact Info":"Contact Info"}</button>
          </div>
        </div>
        {expandedApproval===a.id&&<div style={{marginTop:12,padding:"14px 18px",background:C.blueL+"40",borderRadius:10,border:`1px solid ${C.g200}`,display:"flex",gap:24,flexWrap:"wrap",marginLeft:58}}>
          {[["Contact",a.contact],["Email",a.email],["Phone",a.phone]].map(([l,v])=><div key={l}>
            <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div>
            <div style={{fontSize:13,fontWeight:600,color:l==="Email"?C.blue:C.g700,marginTop:2}}>{v}</div>
          </div>)}
        </div>}
      </Card>})}
      {filteredApprovals.length===0&&<Card><div style={{padding:"40px 0",textAlign:"center",color:C.g400,fontSize:13}}>No approvals match the current filter.</div></Card>}
    </>}
  </div>
}

/* ======== ORGANIZATION ======== */
function Org(){
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
      <Card style={{flex:2,minWidth:320}}><Sec action={<button style={btnO}>✏️ Edit</button>}>District Information</Sec><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>{[["District","Ascension Parish School Board"],["Address","1100 Webster St, Donaldsonville, LA 70346"],["Phone","(225) 391-7000"],["Timezone","America/Chicago"],["Superintendent","Dr. Edith M. Walker"],["Campuses Enrolled","5 of 32"]].map(([l,v])=><div key={l}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:5}}>{l}</div><div style={{fontSize:13,color:C.g700,fontWeight:500,background:C.g50,padding:"10px 12px",borderRadius:8,border:`1px solid ${C.g200}`}}>{v}</div></div>)}</div></Card>
      <Card style={{flex:1,minWidth:240}}><Sec action={<button style={{...btnO,fontSize:12,padding:"5px 12px"}}>+ Add</button>}>Payment Accounts</Sec>{campuses.map(c=><div key={c.id} style={{padding:"10px 0",borderBottom:`1px solid ${C.g100}`}}><div style={{fontSize:11,color:C.g400,marginBottom:2}}>{c.name}</div><div style={{fontSize:13,color:C.g700,letterSpacing:"0.06em"}}>**** **** **** ****</div></div>)}</Card>
    </div>
    <Card><Sec>Amenities & Add-ons</Sec><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>{amenities.map(a=><div key={a.n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:C.g50,borderRadius:10,border:`1px solid ${C.g200}`}}><span style={{fontSize:13,color:C.g700,fontWeight:600}}>{a.n}</span><span style={{fontSize:13,fontWeight:800,color:a.p>0?C.blue:C.g400}}>{a.p>0?`$${a.p}`:"Free"}</span></div>)}</div></Card>
    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}><Card style={{flex:1}}><Sec>Notifications</Sec>{["Email Notifications","SMS Notifications"].map(n=><div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0"}}><span style={{fontSize:13,color:C.g600}}>{n}</span><div style={{width:42,height:22,borderRadius:11,background:C.green,cursor:"pointer",position:"relative"}}><div style={{width:16,height:16,borderRadius:"50%",background:C.w,position:"absolute",top:3,right:3,boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/></div></div>)}</Card><Card style={{flex:1}}><Sec>Tax Settings</Sec><div style={{display:"flex",alignItems:"center",gap:8}}><input type="text" placeholder="0" style={{width:56,padding:"9px 12px",border:`1px solid ${C.g300}`,borderRadius:8,fontSize:16,fontWeight:700,textAlign:"center",fontFamily:font}}/><span style={{fontSize:16,color:C.g400,fontWeight:700}}>%</span></div></Card></div>
  </div>
}

/* ======== REPORTING (expanded ratings) ======== */
/* Ratings data: individual reviews with user info, comments, contact */
const ratingsData=[
  {id:1,user:"Bayou City Volleyball",contact:"Sarah Fontenot",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",campus:"Dutchtown High School",asset:"Dutchtown Gymnasium",rating:5,date:"02/04/2026",comment:"Gym was spotless and the scoreboard worked perfectly. Best facility we rent in the parish. Will keep coming back every week.",sentiment:"positive",booked:18,photo:"BC",color:C.blue},
  {id:2,user:"Gonzales FC",contact:"Marco Reyes",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",campus:"Prairieville High School",asset:"Prairieville Athletic Complex",rating:4,date:"02/02/2026",comment:"Great fields - well maintained. Only complaint is the parking lot lights were off and families had to walk to their cars in the dark after our 9 PM session.",sentiment:"mixed",booked:14,photo:"GF",color:C.purple},
  {id:3,user:"Ascension Elite Cheer",contact:"Brittany Hebert",email:"elitecheer@ascension.org",phone:"(225) 555-0137",campus:"St. Amant High School",asset:"St. Amant Gymnasium",rating:5,date:"01/30/2026",comment:"Love this gym for cheer practice. The floor is in great shape and Coach Bourque always has the facility ready for us when we arrive.",sentiment:"positive",booked:12,photo:"AE",color:C.orange},
  {id:4,user:"Louisiana Tigers AAU",contact:"James Washington",email:"latigersaau@gmail.com",phone:"(225) 555-0419",campus:"Dutchtown High School",asset:"Dutchtown Gymnasium",rating:5,date:"01/26/2026",comment:"Our AAU kids love playing here. Hoops are regulation, bleachers are solid, and the AC actually works. 10/10.",sentiment:"positive",booked:10,photo:"LT",color:C.green},
  {id:5,user:"River Parish Runners",contact:"Denise Toups",email:"rprunners@hotmail.com",phone:"(225) 555-0753",campus:"St. Amant High School",asset:"Gator Stadium",rating:2,date:"01/18/2026",comment:"Track surface had some uneven patches near lane 3 that made our runners nervous. Also the gate was locked when we arrived and nobody was there to let us in for 20 minutes. Need better coordination.",sentiment:"negative",booked:6,photo:"RP",color:C.g400},
  {id:6,user:"Bayou City Volleyball",contact:"Sarah Fontenot",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",campus:"East Ascension High School",asset:"East Ascension Gymnasium",rating:3,date:"01/15/2026",comment:"Gym is fine but the nets were missing a crank handle and we had to improvise. Submitted a maintenance request - hope it gets fixed before next time.",sentiment:"mixed",booked:18,photo:"BC",color:C.blue},
  {id:7,user:"Gonzales FC",contact:"Marco Reyes",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",campus:"Prairieville High School",asset:"Prairieville Athletic Complex",rating:5,date:"01/10/2026",comment:"Saturday morning scrimmage went perfectly. Fields were lined, goals were set up, and the concession stand was open. Parents loved it.",sentiment:"positive",booked:14,photo:"GF",color:C.purple},
  {id:8,user:"Louisiana Tigers AAU",contact:"James Washington",email:"latigersaau@gmail.com",phone:"(225) 555-0419",campus:"East Ascension High School",asset:"East Ascension Gymnasium",rating:4,date:"01/08/2026",comment:"Good gym but could use some updated padding on the walls behind the baskets. Kids play hard and that's a safety concern.",sentiment:"mixed",booked:10,photo:"LT",color:C.green},
  {id:9,user:"Ascension Elite Cheer",contact:"Brittany Hebert",email:"elitecheer@ascension.org",phone:"(225) 555-0137",campus:"Dutchtown High School",asset:"Dutchtown Gymnasium",rating:4,date:"01/05/2026",comment:"Facility was great but the custodian had to come move some wrestling mats that were left out. Minor issue but added 15 min to our setup.",sentiment:"mixed",booked:12,photo:"AE",color:C.orange},
  {id:10,user:"Bayou City Volleyball",contact:"Sarah Fontenot",email:"bayoucityvb@gmail.com",phone:"(225) 555-0182",campus:"Dutchtown High School",asset:"Dutchtown Gymnasium",rating:5,date:"12/20/2025",comment:"Always a great experience at Dutchtown. The staff is friendly and the gym is tournament-ready.",sentiment:"positive",booked:18,photo:"BC",color:C.blue},
  {id:11,user:"River Parish Runners",contact:"Denise Toups",email:"rprunners@hotmail.com",phone:"(225) 555-0753",campus:"East Ascension High School",asset:"Spartan Stadium",rating:3,date:"01/06/2026",comment:"Decent track but the starting blocks were missing from lanes 5-8. Had to borrow from the school's equipment shed. Water fountain was also broken.",sentiment:"mixed",booked:6,photo:"RP",color:C.g400},
  {id:12,user:"Gonzales FC",contact:"Marco Reyes",email:"gonzalesfc@yahoo.com",phone:"(225) 555-0294",campus:"Prairieville High School",asset:"Prairieville Athletic Complex",rating:4,date:"12/15/2025",comment:"Solid session. One of the field lights in the southwest corner was flickering but otherwise everything was good.",sentiment:"mixed",booked:14,photo:"GF",color:C.purple},
];
const ratingTrendData=[{m:"Sep",avg:3.8,count:6},{m:"Oct",avg:4.0,count:9},{m:"Nov",avg:4.1,count:11},{m:"Dec",avg:4.3,count:8},{m:"Jan",avg:4.1,count:14},{m:"Feb",avg:4.5,count:4}];
const sentimentColors={positive:C.green,mixed:C.orange,negative:C.red};

function Reporting(){
  const [rt,setRt]=useState(0);
  const [ratingsView,setRatingsView]=useState("overview");
  const [ratingsCampus,setRatingsCampus]=useState("all");
  const [ratingSentiment,setRatingSentiment]=useState("all");
  const [expandedReview,setExpandedReview]=useState(null);
  const rTabs=["Ratings & Reviews","Revenue - Campus","Revenue - Facility","Revenue - Participant","Payouts Report"];

  const filteredRatings=ratingsData.filter(r=>{
    if(ratingsCampus!=="all"&&r.campus!==ratingsCampus)return false;
    if(ratingSentiment!=="all"&&r.sentiment!==ratingSentiment)return false;
    return true;
  });
  const avgRating=(filteredRatings.reduce((s,r)=>s+r.rating,0)/filteredRatings.length||0).toFixed(1);
  const distrib=[1,2,3,4,5].map(s=>filteredRatings.filter(r=>r.rating===s).length);
  const maxDistrib=Math.max(...distrib,1);

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{rTabs.map((t,i)=><button key={t} onClick={()=>setRt(i)} style={{...btnO,...(rt===i?{background:C.blue,color:C.w,border:"none"}:{})}}>{t}</button>)}</div>

    {rt===0&&<>
      {/* Ratings header metrics */}
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <Card style={{flex:1,minWidth:160,textAlign:"center"}}>
          <div style={{fontSize:42,fontWeight:900,color:C.g800,lineHeight:1}}>{avgRating}</div>
          <div style={{margin:"6px 0 4px"}}>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<Math.round(parseFloat(avgRating))?"#FBBF24":C.g300,fontSize:18}}>★</span>)}</div>
          <div style={{fontSize:11,color:C.g400,fontWeight:600}}>{filteredRatings.length} total reviews</div>
        </Card>
        <Card style={{flex:1.5,minWidth:200}}>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Distribution</div>
          {[5,4,3,2,1].map(star=>{const cnt=distrib[star-1];return <div key={star} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:700,color:C.g600,width:14,textAlign:"right"}}>{star}</span>
            <span style={{color:"#FBBF24",fontSize:12}}>★</span>
            <div style={{flex:1,height:8,background:C.g100,borderRadius:4,overflow:"hidden"}}><div style={{width:`${(cnt/maxDistrib)*100}%`,height:"100%",background:star>=4?C.green:star===3?C.orange:C.red,borderRadius:4,transition:"width .3s"}}/></div>
            <span style={{fontSize:11,fontWeight:700,color:C.g500,width:20,textAlign:"right"}}>{cnt}</span>
          </div>})}
        </Card>
        <Card style={{flex:1,minWidth:160}}>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Sentiment</div>
          {[["positive","Positive",ratingsData.filter(r=>r.sentiment==="positive").length],["mixed","Mixed",ratingsData.filter(r=>r.sentiment==="mixed").length],["negative","Needs Attn",ratingsData.filter(r=>r.sentiment==="negative").length]].map(([k,l,n])=><div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{width:8,height:8,borderRadius:4,background:sentimentColors[k]}}/>
              <span style={{fontSize:12,fontWeight:600,color:C.g700}}>{l}</span>
            </div>
            <span style={{fontSize:14,fontWeight:800,color:C.g800}}>{n}</span>
          </div>)}
        </Card>
        <Card style={{flex:1,minWidth:160}}>
          <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Action Items</div>
          <div style={{fontSize:28,fontWeight:900,color:C.red,lineHeight:1}}>{ratingsData.filter(r=>r.rating<=2).length}</div>
          <div style={{fontSize:11,color:C.g500,marginTop:4,fontWeight:600}}>Reviews rated 2 or below</div>
          <div style={{fontSize:11,color:C.red,marginTop:6,fontWeight:700,cursor:"pointer"}} onClick={()=>{setRatingSentiment("negative");setRatingsView("reviews")}}>→ View & follow up</div>
        </Card>
      </div>

      {/* Rating trend chart */}
      <Card>
        <Sec action={<div style={{display:"flex",gap:4}}>{[["overview","Overview"],["reviews","All Reviews"]].map(([k,l])=><button key={k} onClick={()=>setRatingsView(k)} style={pill(ratingsView===k)}>{l}</button>)}</div>}>Rating Trends</Sec>
        {ratingsView==="overview"&&<>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ratingTrendData}><defs><linearGradient id="ratingGr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FBBF24" stopOpacity={.3}/><stop offset="100%" stopColor="#FBBF24" stopOpacity={.02}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.g200} vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}}/><YAxis domain={[1,5]} axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}} ticks={[1,2,3,4,5]}/><Tooltip content={<Tip/>}/>
              <Area type="monotone" dataKey="avg" name="Avg Rating" stroke="#FBBF24" strokeWidth={2.5} fill="url(#ratingGr)" dot={{r:5,fill:"#FBBF24",strokeWidth:2,stroke:C.w}} activeDot={{r:7,stroke:"#FBBF24",strokeWidth:2,fill:C.w}}/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>{ratingTrendData.map(d=><div key={d.m} style={{flex:1,minWidth:70,padding:"8px 10px",background:C.g50,borderRadius:8,textAlign:"center",border:`1px solid ${C.g200}`}}><div style={{fontSize:10,color:C.g400,fontWeight:700}}>{d.m}</div><div style={{fontSize:16,fontWeight:800,color:C.g800}}>{d.avg}</div><div style={{fontSize:10,color:C.g400}}>{d.count} reviews</div></div>)}</div>
        </>}
      </Card>

      {/* Campus breakdown table */}
      <Card>
        <Sec action={<select value={ratingsCampus} onChange={e=>setRatingsCampus(e.target.value)} style={sel}><option value="all">All Campuses</option>{campuses.map(c=><option key={c.id} value={c.name}>{c.short}</option>)}</select>}>Ratings by Campus</Sec>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Campus","Total Reviews","Avg Rating","Trend (3mo)","Positive","Needs Attn",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{campuses.map((c,i)=>{
            const cr=ratingsData.filter(r=>r.campus===c.name);const cAvg=cr.length?(cr.reduce((s,r)=>s+r.rating,0)/cr.length).toFixed(1):"--";
            const pos=cr.filter(r=>r.sentiment==="positive").length;const neg=cr.filter(r=>r.sentiment==="negative").length;
            return <tr key={c.id} style={{background:i%2===0?C.g50:C.w}}>
              <td style={{...TD,fontWeight:600,color:C.g700}}>{c.name}</td>
              <td style={TD}>{cr.length}</td>
              <td style={TD}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:800,color:parseFloat(cAvg)>=4?C.green:parseFloat(cAvg)>=3?C.orange:C.red}}>{cAvg}</span>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<Math.round(parseFloat(cAvg)||0)?"#FBBF24":C.g300,fontSize:12}}>★</span>)}</div></td>
              <td style={TD}><span style={{fontSize:12,fontWeight:700,color:[C.green,C.green,C.green,C.orange,C.orange][i]}}>{["↑ +0.3","↑ +0.1","↑ +0.2","- 0.0","↓ -0.1"][i]}</span></td>
              <td style={TD}><span style={{background:C.greenL,color:C.green,padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:700}}>{pos}</span></td>
              <td style={TD}>{neg>0?<span style={{background:C.redL,color:C.red,padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:700}}>{neg}</span>:<span style={{color:C.g300}}>--</span>}</td>
              <td style={TD}><button onClick={()=>{setRatingsCampus(c.name);setRatingsView("reviews")}} style={{...btnO,padding:"4px 10px",fontSize:11,color:C.blue,borderColor:`${C.blue}40`}}>View Reviews</button></td>
            </tr>})}</tbody>
        </table>
      </Card>

      {/* Individual Reviews Feed */}
      {ratingsView==="reviews"&&<Card>
        <Sec action={<div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{display:"flex",gap:4,background:C.g100,borderRadius:10,padding:3}}>{[["all","All"],["positive","Positive"],["mixed","Mixed"],["negative","Needs Attn"]].map(([k,l])=><button key={k} onClick={()=>setRatingSentiment(k)} style={pill(ratingSentiment===k)}>{l}</button>)}</div>
          <ExportBtns/>
        </div>}>Individual Reviews ({filteredRatings.length})</Sec>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {filteredRatings.map((r,i)=><div key={r.id} style={{padding:"16px 0",borderBottom:i<filteredRatings.length-1?`1px solid ${C.g100}`:"none"}}>
            {/* Review header row */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start",flex:1}}>
                <div style={{width:40,height:40,borderRadius:12,background:r.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:13,flexShrink:0}}>{r.photo}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontSize:14,fontWeight:700,color:C.g800}}>{r.user}</span>
                    <span style={{background:sentimentColors[r.sentiment]+"18",color:sentimentColors[r.sentiment],padding:"2px 8px",borderRadius:5,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{r.sentiment==="negative"?"Needs Follow-up":r.sentiment}</span>
                  </div>
                  <div style={{fontSize:12,color:C.g500,marginTop:2}}>{r.asset} - {r.campus}</div>
                  <div style={{margin:"6px 0"}}>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<r.rating?"#FBBF24":C.g300,fontSize:15}}>★</span>)}</div>
                  <div style={{fontSize:13,color:C.g700,lineHeight:1.55,fontStyle:"italic"}}>"{r.comment}"</div>
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:11,color:C.g400}}>{r.date}</div>
                <button onClick={()=>setExpandedReview(expandedReview===r.id?null:r.id)} style={{marginTop:6,background:expandedReview===r.id?C.blue:C.blueL,color:expandedReview===r.id?C.w:C.blue,border:`1px solid ${expandedReview===r.id?C.blue:`${C.blue}30`}`,borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:font,display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}><span style={{fontSize:12}}>{expandedReview===r.id?"✕":"👤"}</span>{expandedReview===r.id?"Close":"Contact & Follow-up"}</button>
              </div>
            </div>
            {/* Expanded contact/follow-up card */}
            {expandedReview===r.id&&<div style={{marginTop:12,marginLeft:52,padding:"14px 18px",background:`linear-gradient(135deg,${C.g50},${C.blueL}40)`,borderRadius:12,border:`1px solid ${C.g200}`,display:"flex",gap:24,flexWrap:"wrap",alignItems:"flex-start"}}>
              <div style={{flex:1,minWidth:180}}>
                <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Contact for Follow-up</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {[["👤",`${r.contact}`,C.g700],["📧",r.email,C.blue],["📱",r.phone,C.g700]].map(([ic,v,c],j)=><div key={j} style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:12}}>{ic}</span>
                    <span style={{fontSize:13,fontWeight:600,color:c}}>{v}</span>
                  </div>)}
                </div>
              </div>
              <div style={{flex:1,minWidth:140}}>
                <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Renter Profile</div>
                <div style={{fontSize:12,color:C.g600}}><span style={{fontWeight:700}}>{r.booked}</span> total bookings</div>
                <div style={{fontSize:12,color:C.g600,marginTop:2}}>Active since {topCustData.find(c=>c.n===r.user)?.since||"2025"}</div>
              </div>
              <div style={{display:"flex",gap:8,alignSelf:"center"}}>
                <button style={{...btnP,fontSize:12,padding:"7px 14px"}}>📧 Email</button>
                <button style={{...btnO,fontSize:12,padding:"7px 14px",color:C.blue,borderColor:`${C.blue}40`}}>📱 Call</button>
                {r.sentiment==="negative"&&<button style={{background:C.red,color:C.w,border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font}}>🚩 Flag Issue</button>}
              </div>
            </div>}
          </div>)}
        </div>
        {filteredRatings.length===0&&<div style={{padding:"40px 0",textAlign:"center",color:C.g400,fontSize:13}}>No reviews match the current filters.</div>}
      </Card>}

      {/* Negative reviews summary - always visible on overview */}
      {ratingsView==="overview"&&ratingsData.filter(r=>r.rating<=2).length>0&&<Card style={{border:`1px solid ${C.red}20`,background:`linear-gradient(135deg,${C.red}04,${C.w})`}}>
        <Sec action={<button onClick={()=>{setRatingSentiment("negative");setRatingsView("reviews")}} style={{...btnO,fontSize:12,padding:"6px 14px",color:C.red,borderColor:`${C.red}40`}}>View All →</button>}>⚠️ Reviews Requiring Attention</Sec>
        {ratingsData.filter(r=>r.rating<=2).map(r=><div key={r.id} style={{padding:"14px 0",borderBottom:`1px solid ${C.g100}`,display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:36,height:36,borderRadius:10,background:C.red+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:16}}>⚠️</span></div>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <span style={{fontSize:13,fontWeight:700,color:C.g800}}>{r.user}</span>
                <span style={{fontSize:12,color:C.g400,marginLeft:8}}>rated {r.asset}</span>
                <span style={{marginLeft:6}}>{Array(5).fill(0).map((_,j)=><span key={j} style={{color:j<r.rating?"#FBBF24":C.g300,fontSize:12}}>★</span>)}</span>
              </div>
              <span style={{fontSize:11,color:C.g400}}>{r.date}</span>
            </div>
            <div style={{fontSize:12,color:C.g600,marginTop:4,fontStyle:"italic",lineHeight:1.5}}>"{r.comment}"</div>
            <div style={{display:"flex",gap:12,marginTop:8,fontSize:11,color:C.g500}}>
              <span>👤 {r.contact}</span><span>📧 {r.email}</span><span>📱 {r.phone}</span>
            </div>
          </div>
        </div>)}
      </Card>}
    </>}

    {rt===1&&<RevByCampus/>}
    {rt===2&&<RevByFacility/>}
    {rt===3&&<RevByParticipant/>}
    {rt===4&&<PayoutsReport/>}
  </div>
}

/* ======== REPORT EXPORT BUTTONS (shared) ======== */
const ExportBtns=()=><div style={{display:"flex",gap:6}}><button style={{...btnO,fontSize:11,padding:"5px 12px"}}>Export CSV</button><button style={{...btnO,fontSize:11,padding:"5px 12px"}}>Export PDF</button></div>;

/* ======== REVENUE - CAMPUS ======== */
const campusRevDetail=[
  {id:"dths",name:"Dutchtown High School",short:"Dutchtown HS",rev:21900,bookings:62,assets:3,util:68,avgRate:353,topAsset:"Dutchtown Gymnasium",topRev:18296,trend:"up",trendPct:"+22%",color:C.blue,monthly:[2800,4200,3600,2100,5800,3400]},
  {id:"eahs",name:"East Ascension High School",short:"East Ascension HS",rev:16100,bookings:48,assets:3,util:52,avgRate:335,topAsset:"Spartan Stadium",topRev:14700,trend:"up",trendPct:"+14%",color:C.green,monthly:[2100,3100,2700,1600,4100,2500]},
  {id:"sahs",name:"St. Amant High School",short:"St. Amant HS",rev:12700,bookings:35,assets:2,util:58,avgRate:363,topAsset:"St. Amant Gymnasium",topRev:11865,trend:"stable",trendPct:"+3%",color:C.orange,monthly:[1500,2200,1800,1200,2400,1600]},
  {id:"phs",name:"Prairieville High School",short:"Prairieville HS",rev:9850,bookings:28,assets:2,util:55,avgRate:352,topAsset:"Prairieville Gymnasium",topRev:9450,trend:"up",trendPct:"+31%",color:C.purple,monthly:[900,1100,1000,600,1400,850]},
  {id:"dohs",name:"Donaldsonville High School",short:"Donaldsonville HS",rev:3461,bookings:19,assets:2,util:31,avgRate:182,topAsset:"Tiger Stadium",topRev:2436,trend:"down",trendPct:"-8%",color:C.blueDk,monthly:[550,640,580,340,520,411]},
];
function RevByCampus(){
  const [expanded,setExpanded]=useState(null);
  const totalRev=campusRevDetail.reduce((s,c)=>s+c.rev,0);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    {/* Summary metrics */}
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      <Card style={{flex:1,minWidth:130,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total Revenue</div><div style={{fontSize:26,fontWeight:900,color:C.g800,marginTop:4}}>${totalRev.toLocaleString()}</div></Card>
      <Card style={{flex:1,minWidth:130,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total Bookings</div><div style={{fontSize:26,fontWeight:900,color:C.g800,marginTop:4}}>{campusRevDetail.reduce((s,c)=>s+c.bookings,0)}</div></Card>
      <Card style={{flex:1,minWidth:130,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Avg Utilization</div><div style={{fontSize:26,fontWeight:900,color:C.blue,marginTop:4}}>{Math.round(campusRevDetail.reduce((s,c)=>s+c.util,0)/5)}%</div></Card>
      <Card style={{flex:1,minWidth:130,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Avg / Booking</div><div style={{fontSize:26,fontWeight:900,color:C.g800,marginTop:4}}>${Math.round(totalRev/campusRevDetail.reduce((s,c)=>s+c.bookings,0))}</div></Card>
    </div>
    {/* Chart */}
    <Card><Sec action={<ExportBtns/>}>Revenue by Campus (6 Months)</Sec>
      <ResponsiveContainer width="100%" height={300}><BarChart data={revByFacData}><CartesianGrid strokeDasharray="3 3" stroke={C.g200} vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:C.g400,fontFamily:font}} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/><Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:11,fontFamily:font}}/><Bar dataKey="dt" name="Dutchtown" fill={C.blue} radius={[3,3,0,0]} barSize={12}/><Bar dataKey="ea" name="East Ascension" fill={C.green} radius={[3,3,0,0]} barSize={12}/><Bar dataKey="sa" name="St. Amant" fill={C.orange} radius={[3,3,0,0]} barSize={12}/><Bar dataKey="pv" name="Prairieville" fill={C.purple} radius={[3,3,0,0]} barSize={12}/><Bar dataKey="dn" name="Donaldsonville" fill={C.blueDk} radius={[3,3,0,0]} barSize={12}/></BarChart></ResponsiveContainer>
    </Card>
    {/* Campus detail table with expandable rows */}
    <Card><Sec>Campus Detail</Sec>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["","Campus","Revenue","Bookings","Assets","Utilization","Avg Rate","Top Asset","Trend",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>{campusRevDetail.map((c,i)=><React.Fragment key={c.id}>
          <tr style={{background:i%2===0?C.g50:C.w,cursor:"pointer"}} onClick={()=>setExpanded(expanded===c.id?null:c.id)}>
            <td style={{...TD,width:14}}><span style={{width:10,height:10,borderRadius:5,background:c.color,display:"inline-block"}}/></td>
            <td style={{...TD,fontWeight:700,color:C.g700}}>{c.name}</td>
            <td style={{...TD,fontWeight:800}}>${c.rev.toLocaleString()}</td>
            <td style={TD}>{c.bookings}</td>
            <td style={TD}>{c.assets}</td>
            <td style={TD}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:50,height:6,background:C.g200,borderRadius:3,overflow:"hidden"}}><div style={{width:`${c.util}%`,height:"100%",background:c.util>=60?C.green:c.util>=40?C.orange:C.red,borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:700}}>{c.util}%</span></div></td>
            <td style={TD}>${c.avgRate}</td>
            <td style={{...TD,fontSize:12,color:C.g500}}>{c.topAsset}</td>
            <td style={TD}><span style={{fontSize:12,fontWeight:700,color:c.trend==="up"?C.green:c.trend==="down"?C.red:C.g400}}>{c.trend==="up"?"↑":"↓"} {c.trendPct}</span></td>
            <td style={{...TD,padding:"10px 8px"}}><div style={{width:28,height:28,borderRadius:8,background:expanded===c.id?C.blue:C.g100,color:expanded===c.id?C.w:C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .15s"}}>{expanded===c.id?"−":"+"}</div></td>
          </tr>
          {expanded===c.id&&<tr><td colSpan={10} style={{padding:"0 14px 14px",background:C.blueL+"30"}}>
            <div style={{padding:"16px 20px",background:C.w,borderRadius:10,border:`1px solid ${C.g200}`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.g800,marginBottom:12}}>Monthly Revenue Breakdown - {c.short}</div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>{["Sep","Oct","Nov","Dec","Jan","Feb"].map((m,mi)=><div key={m} style={{flex:1,textAlign:"center",padding:"10px 6px",background:C.g50,borderRadius:8,border:`1px solid ${C.g200}`}}>
                <div style={{fontSize:10,color:C.g400,fontWeight:700}}>{m}</div>
                <div style={{fontSize:15,fontWeight:800,color:C.g800,marginTop:2}}>${(c.monthly[mi]/1000).toFixed(1)}k</div>
              </div>)}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
                {[["Top Earning Asset",c.topAsset],["Top Asset Revenue","$"+c.topRev.toLocaleString()],["Revenue Per Asset","$"+Math.round(c.rev/c.assets).toLocaleString()],["Peak Month",["Sep","Oct","Nov","Dec","Jan","Feb"][c.monthly.indexOf(Math.max(...c.monthly))]]].map(([l,v])=><div key={l}><div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:C.g800,marginTop:2}}>{v}</div></div>)}
              </div>
            </div>
          </td></tr>}
        </React.Fragment>)}</tbody>
      </table>
    </Card>
  </div>
}

/* ======== REVENUE - FACILITY ======== */
const facilityRevDetail=[
  {a:"Dutchtown Gymnasium",c:"Dutchtown HS",ci:"dths",rev:18296,bookings:42,util:68,avgRate:436,topParticipant:"Bayou City Volleyball",topRev:6840,pct:30,color:C.blue,types:{volleyball:8400,basketball:4200,cheer:3600,other:2096}},
  {a:"Spartan Stadium",c:"East Ascension HS",ci:"eahs",rev:14700,bookings:22,util:52,avgRate:668,topParticipant:"River Parish Runners",topRev:1845,pct:24,color:C.green,types:{track:5200,football:4800,soccer:2700,other:2000}},
  {a:"St. Amant Gymnasium",c:"St. Amant HS",ci:"sahs",rev:11865,bookings:30,util:58,avgRate:396,topParticipant:"Ascension Elite Cheer",topRev:4380,pct:19,color:C.orange,types:{cheer:5400,basketball:3200,dance:2100,other:1165}},
  {a:"Prairieville Gymnasium",c:"Prairieville HS",ci:"phs",rev:9450,bookings:28,util:55,avgRate:338,topParticipant:"Gonzales FC",topRev:5274,pct:15,color:C.purple,types:{soccer:5274,basketball:2100,other:2076}},
  {a:"Gator Stadium",c:"St. Amant HS",ci:"sahs",rev:3200,bookings:10,util:31,avgRate:320,topParticipant:"River Parish Runners",topRev:1845,pct:5,color:C.orange,types:{track:2200,other:1000}},
  {a:"Tiger Stadium",c:"Donaldsonville HS",ci:"dohs",rev:2436,bookings:14,util:38,avgRate:174,topParticipant:"Community Youth BBall",topRev:960,pct:4,color:C.blueDk,types:{football:1200,basketball:960,other:276}},
  {a:"Dutchtown Stadium",c:"Dutchtown HS",ci:"dths",rev:1064,bookings:6,util:18,avgRate:177,topParticipant:"Gonzales FC",topRev:475,pct:2,color:C.blue,types:{football:600,other:464}},
];
function RevByFacility(){
  const [locFilt,setLocFilt]=useState("all");
  const [expanded,setExpanded]=useState(null);
  const filtered=locFilt==="all"?facilityRevDetail:facilityRevDetail.filter(f=>f.c===locFilt);
  const totalRev=filtered.reduce((s,f)=>s+f.rev,0);const totalBook=filtered.reduce((s,f)=>s+f.bookings,0);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Campus</div>
          <select value={locFilt} onChange={e=>setLocFilt(e.target.value)} style={sel}><option value="all">All Campuses</option>{campuses.map(c=><option key={c.id} value={c.short}>{c.short}</option>)}</select></div>
        <button style={{...btnP,height:38}}>Search</button>
      </div>
    </Card>
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      <Card style={{flex:1,minWidth:160,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase"}}>Total Reservations</div><div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:4}}>{totalBook}</div></Card>
      <Card style={{flex:1,minWidth:160,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase"}}>Total Revenue</div><div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:4}}>${totalRev.toLocaleString()}</div></Card>
    </div>
    <Card>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div><span style={{fontSize:15,fontWeight:800,color:C.g800}}>Results Found: {filtered.length}</span></div><ExportBtns/></div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Facility","Campus","Bookings","Revenue","Utilization","Avg Rate","Top Participant","% of Total",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>{filtered.map((f,i)=><React.Fragment key={f.a}>
          <tr style={{background:i%2===0?C.g50:C.w,cursor:"pointer"}} onClick={()=>setExpanded(expanded===f.a?null:f.a)}>
            <td style={{...TD,fontWeight:600,color:C.g700}}>{f.a}</td>
            <td style={{...TD,color:C.g500,fontSize:12}}>{f.c}</td>
            <td style={{...TD,fontWeight:700}}>{f.bookings}</td>
            <td style={{...TD,fontWeight:800}}>${f.rev.toLocaleString()}</td>
            <td style={TD}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:50,height:6,background:C.g200,borderRadius:3,overflow:"hidden"}}><div style={{width:`${f.util}%`,height:"100%",background:f.util>=60?C.green:f.util>=40?C.orange:C.red,borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:700}}>{f.util}%</span></div></td>
            <td style={TD}>${f.avgRate}</td>
            <td style={{...TD,fontSize:12,color:C.g500}}>{f.topParticipant}</td>
            <td style={TD}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:60,height:6,background:C.g200,borderRadius:3,overflow:"hidden"}}><div style={{width:`${f.pct}%`,height:"100%",background:f.color,borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:700,color:C.g600}}>{f.pct}%</span></div></td>
            <td style={{...TD,padding:"10px 8px"}}><div style={{width:28,height:28,borderRadius:8,background:expanded===f.a?C.blue:C.g100,color:expanded===f.a?C.w:C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .15s"}}>{expanded===f.a?"−":"+"}</div></td>
          </tr>
          {expanded===f.a&&<tr><td colSpan={9} style={{padding:"0 14px 14px",background:C.blueL+"30"}}>
            <div style={{padding:"16px 20px",background:C.w,borderRadius:10,border:`1px solid ${C.g200}`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.g800,marginBottom:12}}>Revenue by Activity Type - {f.a}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>{Object.entries(f.types).map(([type,rev])=><div key={type} style={{padding:"10px 16px",background:C.g50,borderRadius:8,border:`1px solid ${C.g200}`,flex:"1 1 120px",minWidth:100}}>
                <div style={{fontSize:10,color:C.g400,fontWeight:700,textTransform:"capitalize"}}>{type}</div>
                <div style={{fontSize:16,fontWeight:800,color:C.g800,marginTop:2}}>${rev.toLocaleString()}</div>
                <div style={{fontSize:10,color:C.g500}}>{Math.round(rev/f.rev*100)}% of facility</div>
              </div>)}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
                {[["Top Participant",f.topParticipant],["Participant Revenue","$"+f.topRev.toLocaleString()],["Revenue Per Booking","$"+f.avgRate],["Capacity Utilization",f.util+"%"]].map(([l,v])=><div key={l}><div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:C.g800,marginTop:2}}>{v}</div></div>)}
              </div>
            </div>
          </td></tr>}
        </React.Fragment>)}</tbody>
      </table>
    </Card>
  </div>
}

/* ======== REVENUE - PARTICIPANT ======== */
function RevByParticipant(){
  const [partFilt,setPartFilt]=useState("all");
  const [expanded,setExpanded]=useState(null);
  const filtered=partFilt==="all"?topCustData:topCustData.filter(c=>c.n===partFilt);
  const totalRev=filtered.reduce((s,c)=>s+c.s,0);const totalBook=filtered.reduce((s,c)=>s+c.b,0);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>From</div>
          <input type="text" defaultValue="October 09, 2025" style={{...sel,width:150}} readOnly/></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>To</div>
          <input type="text" defaultValue="February 06, 2026" style={{...sel,width:150}} readOnly/></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Participant</div>
          <select value={partFilt} onChange={e=>setPartFilt(e.target.value)} style={sel}><option value="all">All Participants</option>{topCustData.map(c=><option key={c.n} value={c.n}>{c.n}</option>)}</select></div>
        <button style={{...btnP,height:38}}>Search</button>
      </div>
    </Card>
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      <Card style={{flex:1,minWidth:160,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase"}}>Total Reservations</div><div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:4}}>{totalBook}</div></Card>
      <Card style={{flex:1,minWidth:160,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase"}}>Total Revenue</div><div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:4}}>${totalRev.toLocaleString()}</div></Card>
    </div>
    <Card>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div><span style={{fontSize:15,fontWeight:800,color:C.g800}}>Results Found: {filtered.length}</span></div><ExportBtns/></div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Participant","Contact","Bookings","Total Revenue","Avg / Booking","Favorite Facility","Member Since","Trend",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>{filtered.map((c,i)=><React.Fragment key={c.n}>
          <tr style={{background:i%2===0?C.g50:C.w,cursor:"pointer"}} onClick={()=>setExpanded(expanded===c.n?null:c.n)}>
            <td style={TD}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${[C.blue,C.green,C.orange,C.blueDk,C.g500][i]},${C.g600})`,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:11}}>{c.photo}</div><span style={{fontWeight:700,color:C.g700}}>{c.n}</span></div></td>
            <td style={{...TD,color:C.g500,fontSize:12}}>{c.email}</td>
            <td style={{...TD,fontWeight:700}}>{c.b}</td>
            <td style={{...TD,fontWeight:800}}>${c.s.toLocaleString()}</td>
            <td style={TD}>${Math.round(c.s/c.b)}</td>
            <td style={{...TD,fontSize:12,color:C.g500}}>{c.fav}</td>
            <td style={{...TD,fontSize:12,color:C.g500}}>{c.since}</td>
            <td style={TD}><span style={{fontSize:12,fontWeight:700,color:c.t==="up"?C.green:c.t==="down"?C.orange:C.g400}}>{c.t==="up"?"↑ Growing":c.t==="down"?"↓ Declining":"- Stable"}</span></td>
            <td style={{...TD,padding:"10px 8px"}}><div style={{width:28,height:28,borderRadius:8,background:expanded===c.n?C.blue:C.g100,color:expanded===c.n?C.w:C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .15s"}}>{expanded===c.n?"−":"+"}</div></td>
          </tr>
          {expanded===c.n&&<tr><td colSpan={9} style={{padding:"0 14px 14px",background:C.blueL+"30"}}>
            <div style={{padding:"16px 20px",background:C.w,borderRadius:10,border:`1px solid ${C.g200}`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.g800,marginBottom:12}}>Booking History - {c.n}</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,marginBottom:14}}><thead><tr>{["Res ID","Asset","Date","Time","Revenue"].map(h=><th key={h} style={{...TH,fontSize:9}}>{h}</th>)}</tr></thead>
                <tbody>{c.hist.map((h,hi)=><tr key={h.id} style={{background:hi%2===0?C.g50:C.w}}>
                  <td style={{...TD,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.blue,fontWeight:700}}>{h.id}</td>
                  <td style={{...TD,padding:"8px 10px",fontWeight:600,color:C.g700}}>{h.asset}</td>
                  <td style={{...TD,padding:"8px 10px",color:C.g500}}>{h.date}</td>
                  <td style={{...TD,padding:"8px 10px",color:C.g500}}>{h.time}</td>
                  <td style={{...TD,padding:"8px 10px",fontWeight:700}}>${h.rev}</td>
                </tr>)}</tbody>
              </table>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
                {[["Contact Email",c.email],["Phone",c.phone],["Favorite Facility",c.fav],["Member Since",c.since]].map(([l,v])=><div key={l}><div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>{l}</div><div style={{fontSize:13,fontWeight:600,color:C.g700,marginTop:2}}>{v}</div></div>)}
              </div>
            </div>
          </td></tr>}
        </React.Fragment>)}</tbody>
      </table>
    </Card>
  </div>
}

/* ======== PAYOUTS REPORT (full transaction-level detail) ======== */
function PayoutsReport(){
  const [locFilt,setLocFilt]=useState("all");
  const [assetFilt,setAssetFilt]=useState("all");
  const [statusFilt,setStatusFilt]=useState("all");
  const [expandedTxn,setExpandedTxn]=useState(null);
  const [perPage,setPerPage]=useState(10);

  const filtered=txnData.filter(t=>{
    if(locFilt!=="all"&&t.facility!==locFilt)return false;
    if(assetFilt!=="all"&&t.asset!==assetFilt)return false;
    if(statusFilt!=="all"&&t.status!==statusFilt)return false;
    return true;
  });
  const totalAmt=filtered.reduce((s,t)=>s+t.amount,0);
  const successAmt=filtered.filter(t=>t.status==="success").reduce((s,t)=>s+t.amount,0);
  const failedAmt=filtered.filter(t=>t.status==="failed").reduce((s,t)=>s+t.amount,0);
  const shown=filtered.slice(0,perPage);
  const allAssets=[...new Set(txnData.map(t=>t.asset))];

  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    {/* Filters bar */}
    <Card>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Campus</div>
          <select value={locFilt} onChange={e=>{setLocFilt(e.target.value);setAssetFilt("all")}} style={sel}><option value="all">All</option>{campuses.map(c=><option key={c.id} value={c.name}>{c.short}</option>)}</select></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Asset</div>
          <select value={assetFilt} onChange={e=>setAssetFilt(e.target.value)} style={sel}><option value="all">{locFilt==="all"?"All Assets":`All at ${campuses.find(c=>c.name===locFilt)?.short||"campus"}`}</option>{(locFilt==="all"?allAssets:allAssets.filter(a=>txnData.some(t=>t.asset===a&&t.facility===locFilt))).map(a=><option key={a} value={a}>{a}</option>)}</select></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>From</div>
          <input type="text" defaultValue="October 09, 2025" style={{...sel,width:150,cursor:"text"}} readOnly/></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>To</div>
          <input type="text" defaultValue="February 06, 2026" style={{...sel,width:150,cursor:"text"}} readOnly/></div>
        <div><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Status</div>
          <select value={statusFilt} onChange={e=>setStatusFilt(e.target.value)} style={sel}><option value="all">All</option><option value="success">Success</option><option value="failed">Failed</option></select></div>
        <button style={{...btnP,height:38}}>Search</button>
      </div>
    </Card>

    {/* Summary metrics */}
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      <Card style={{flex:1,minWidth:140,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total Transactions</div><div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:4}}>{filtered.length}</div></Card>
      <Card style={{flex:1,minWidth:140,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Total Revenue</div><div style={{fontSize:28,fontWeight:900,color:C.g800,marginTop:4}}>${totalAmt.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div></Card>
      <Card style={{flex:1,minWidth:140,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Successful</div><div style={{fontSize:28,fontWeight:900,color:C.green,marginTop:4}}>${successAmt.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div></Card>
      {failedAmt>0&&<Card style={{flex:1,minWidth:140,textAlign:"center",border:`1px solid ${C.red}20`}}><div style={{fontSize:10,fontWeight:700,color:C.red,textTransform:"uppercase",letterSpacing:"0.06em"}}>Failed / At Risk</div><div style={{fontSize:28,fontWeight:900,color:C.red,marginTop:4}}>${failedAmt.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div></Card>}
    </div>

    {/* Monthly payout summary */}
    <Card>
      <Sec action={<ExportBtns/>}>Monthly Payout Summary</Sec>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Month","Payout Amount","Transactions","Avg / Txn","Status","Deposit Date"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>{payoutsData.map((p,i)=>{const mTxns=txnData.filter(t=>{const m=t.updatedAt.split("/");const mo=parseInt(m[0]);const yr=parseInt(m[1]);return p.month.includes(["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][mo])});
          return <tr key={p.month} style={{background:i%2===0?C.g50:C.w}}>
          <td style={{...TD,fontWeight:600,color:C.g700}}>{p.month}</td>
          <td style={{...TD,fontWeight:700}}>${p.total.toLocaleString()}</td>
          <td style={TD}>{[4,5,3,8,6][i]||"--"}</td>
          <td style={TD}>${[2810,1936,1947,1778,1460][i]||"--"}</td>
          <td style={TD}><span style={statusBadge(p.status==="paid"?"completed":p.status)}><span style={{width:6,height:6,borderRadius:"50%",background:"currentColor"}}/>{p.status}</span></td>
          <td style={{...TD,color:C.g500}}>{p.date}</td>
        </tr>})}</tbody>
      </table>
    </Card>

    {/* Transaction detail table */}
    <Card>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div><span style={{fontSize:15,fontWeight:800,color:C.g800}}>Transaction Details</span><span style={{fontSize:12,color:C.g400,marginLeft:10}}>Results Found: {filtered.length}</span></div>
        <ExportBtns/>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:900}}>
          <thead><tr>{["ID","Updated At","Res ID","Asset","Campus","Transfer Date","Amount","Discount","Status",""].map(h=><th key={h} style={{...TH,fontSize:9,padding:"8px 10px"}}>{h}</th>)}</tr></thead>
          <tbody>{shown.map((t,i)=><React.Fragment key={t.id}>
            <tr key={t.id} style={{background:t.status==="failed"?`${C.red}06`:i%2===0?C.g50:C.w,cursor:"pointer"}} onClick={()=>setExpandedTxn(expandedTxn===t.id?null:t.id)}>
              <td style={{...TD,padding:"10px",fontWeight:700,color:C.blue,fontFamily:"monospace",fontSize:11}}>{t.id}</td>
              <td style={{...TD,padding:"10px",color:C.g500,fontSize:11}}>{t.updatedAt}</td>
              <td style={{...TD,padding:"10px",fontFamily:"monospace",fontSize:10,color:C.g500}}>{t.resId}</td>
              <td style={{...TD,padding:"10px",fontWeight:600,color:C.g700}}>{t.asset}</td>
              <td style={{...TD,padding:"10px",color:C.g500,fontSize:11}}>{t.facility}</td>
              <td style={{...TD,padding:"10px",color:C.g500,fontSize:11}}>{t.transferDate}</td>
              <td style={{...TD,padding:"10px",fontWeight:700,color:t.status==="failed"?C.red:C.g800}}>${t.amount.toFixed(2)}</td>
              <td style={{...TD,padding:"10px",color:t.discount!=="N/A"?C.blue:C.g400,fontSize:11,fontWeight:t.discount!=="N/A"?700:400}}>{t.discount}</td>
              <td style={{...TD,padding:"10px"}}><span style={{...statusBadge(t.status==="success"?"completed":"failed"),fontSize:10,padding:"2px 8px"}}><span style={{width:5,height:5,borderRadius:"50%",background:"currentColor"}}/>{t.status}</span></td>
              <td style={{...TD,padding:"10px 8px"}}><div style={{width:28,height:28,borderRadius:8,background:expandedTxn===t.id?C.blue:C.g100,color:expandedTxn===t.id?C.w:C.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .15s"}}>{expandedTxn===t.id?"−":"+"}</div></td>
            </tr>
            {expandedTxn===t.id&&<tr key={t.id+"exp"}><td colSpan={10} style={{padding:"0 10px 12px",background:C.blueL+"40"}}>
              <div style={{padding:"14px 18px",borderRadius:10,background:C.w,border:`1px solid ${C.g200}`,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                {[["Destination Account",t.destAcct],["Transfer ID",t.transferId],["Account Payment ID",t.acctPayId],["Payment Intent ID",t.intentId],["Facility",t.facility],["Transfer Date",t.transferDate]].map(([l,v])=><div key={l}>
                  <div style={{fontSize:9,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{l}</div>
                  <div style={{fontSize:11,color:C.g700,fontFamily:l.includes("ID")||l.includes("Account")?"monospace":"inherit",wordBreak:"break-all",fontWeight:500}}>{v}</div>
                </div>)}
              </div>
            </td></tr>}
          </React.Fragment>)}</tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14,paddingTop:14,borderTop:`1px solid ${C.g200}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <select value={perPage} onChange={e=>setPerPage(parseInt(e.target.value))} style={{...sel,padding:"6px 28px 6px 10px",fontSize:12}}><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option></select>
          <span style={{fontSize:11,color:C.g400}}>per page</span>
        </div>
        <div style={{fontSize:12,color:C.g500}}>Showing {Math.min(perPage,filtered.length)} of {filtered.length} transactions</div>
        <div style={{display:"flex",gap:4}}>
          <button style={{...btnO,padding:"5px 10px",fontSize:12}}>‹ Prev</button>
          <button style={{...btnO,padding:"5px 10px",fontSize:12,background:C.blue,color:C.w,border:"none"}}>1</button>
          {filtered.length>perPage&&<button style={{...btnO,padding:"5px 10px",fontSize:12}}>2</button>}
          {filtered.length>perPage*2&&<button style={{...btnO,padding:"5px 10px",fontSize:12}}>3</button>}
          <button style={{...btnO,padding:"5px 10px",fontSize:12}}>Next ›</button>
        </div>
      </div>
    </Card>
  </div>
}

/* ======== USERS & ROLE MANAGEMENT ======== */
/* District staff only - participants are external and not managed here */
const staffData=[
  {name:"Marcus Williams",email:"m.williams@apsb.org",role:"District Admin",loc:"District Office",campus:"all",status:true,updated:"02/01/2026",initials:"MW",color:C.blue,phone:"(225) 391-7001"},
  {name:"Coach Tony Richard",email:"t.richard@apsb.org",role:"Site Admin",loc:"Dutchtown High School",campus:"dths",status:true,updated:"01/28/2026",initials:"TR",color:C.green,phone:"(225) 391-7145"},
  {name:"Denise Landry",email:"d.landry@apsb.org",role:"Site Admin",loc:"East Ascension High School",campus:"eahs",status:true,updated:"01/25/2026",initials:"DL",color:C.orange,phone:"(225) 391-7200"},
  {name:"Coach Ray Bourque",email:"r.bourque@apsb.org",role:"Site Admin",loc:"St. Amant High School",campus:"sahs",status:true,updated:"01/30/2026",initials:"RB",color:C.purple,phone:"(225) 391-7310"},
  {name:"Amy Melancon",email:"a.melancon@apsb.org",role:"Site Admin",loc:"Prairieville High School",campus:"phs",status:true,updated:"02/03/2026",initials:"AM",color:C.blueDk,phone:"(225) 391-7420"},
  {name:"Derek Simmons",email:"d.simmons@apsb.org",role:"Facility Manager",loc:"Donaldsonville High School",campus:"dohs",status:true,updated:"01/20/2026",initials:"DS",color:C.g500,phone:"(225) 391-7500"},
  {name:"Claire Dupuis",email:"c.dupuis@apsb.org",role:"Facility Manager",loc:"Dutchtown High School",campus:"dths",status:true,updated:"02/05/2026",initials:"CD",color:C.green,phone:"(225) 391-7146"},
  {name:"Brad Nguyen",email:"b.nguyen@apsb.org",role:"Read Only",loc:"District Office",campus:"all",status:true,updated:"01/15/2026",initials:"BN",color:C.g400,phone:"(225) 391-7002"},
  {name:"Janet Boudreaux",email:"j.boudreaux@apsb.org",role:"Site Admin",loc:"St. Amant High School",campus:"sahs",status:false,updated:"12/10/2025",initials:"JB",color:C.g400,phone:"(225) 391-7312"},
];
const roleDefinitions=[
  {role:"District Admin",desc:"Full access to all campuses, users, settings, and financial data",color:C.blue,perms:{reservations:["read","create","update","delete"],dashboard:["read","create","update","delete"],facilities:["read","create","update","delete"],organizations:["read","create","update","delete"],reporting:["read","create","update","delete"],users:["read","create","update","delete"],approvals:["read","create","update","delete"],settings:["read","create","update","delete"],payouts:["read","create","update","delete"],roles:["read","create","update","delete"]}},
  {role:"Site Admin",desc:"Full access within assigned campus. Cannot manage other campuses or district settings",color:C.green,perms:{reservations:["read","create","update","delete"],dashboard:["read"],facilities:["read","create","update"],organizations:["read"],reporting:["read"],users:["read"],approvals:["read","create","update"],settings:["read"],payouts:["read"],roles:[]}},
  {role:"Facility Manager",desc:"Manage reservations and facility operations at assigned campus. No financial access",color:C.orange,perms:{reservations:["read","create","update"],dashboard:["read"],facilities:["read","update"],organizations:["read"],reporting:[],users:[],approvals:["read","create"],settings:[],payouts:[],roles:[]}},
  {role:"Read Only",desc:"View-only access to dashboards and reports. Ideal for board members or oversight",color:C.g400,perms:{reservations:["read"],dashboard:["read"],facilities:["read"],organizations:["read"],reporting:["read"],users:[],approvals:[],settings:[],payouts:["read"],roles:[]}},
];
const permFeatures=["reservations","dashboard","facilities","organizations","reporting","users","approvals","settings","payouts","roles"];
const permLabels={reservations:"Reservations",dashboard:"Dashboard",facilities:"Facilities",organizations:"Organizations",reporting:"Reporting",users:"Users",approvals:"Approvals",settings:"Settings",payouts:"Payouts & Finance",roles:"Role Management"};
const permTypes=["read","create","update","delete"];

function Users(){
  const [search,setSearch]=useState("");
  const [roleFilter,setRoleFilter]=useState("all");
  const [showRoles,setShowRoles]=useState(false);
  const [editRole,setEditRole]=useState(null);
  const [editPerms,setEditPerms]=useState(null);
  const filtered=staffData.filter(u=>{
    const matchSearch=u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole=roleFilter==="all"||u.role===roleFilter;
    return matchSearch&&matchRole;
  });
  const roleBadge=(r)=>{const m={"District Admin":{bg:C.blueL,c:C.blue},"Site Admin":{bg:C.greenL,c:C.green},"Facility Manager":{bg:C.orangeL,c:C.orange},"Read Only":{bg:C.g100,c:C.g500}};const x=m[r]||m["Read Only"];return{background:x.bg,color:x.c,padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:700}};
  const campusLabel=(c)=>c==="all"?"All Campuses":campuses.find(x=>x.id===c)?.short||c;
  const togglePerm=(feat,perm)=>{if(!editPerms)return;const cur=editPerms[feat]||[];setEditPerms({...editPerms,[feat]:cur.includes(perm)?cur.filter(p=>p!==perm):[...cur,perm]})};

  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    {/* Role Editor Slideout */}
    {editRole!==null&&<SlidePanel open={true} onClose={()=>{setEditRole(null);setEditPerms(null)}} width={560}>
      <div style={{padding:"24px 30px",borderBottom:`1px solid ${C.g200}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Roles Management &gt; Edit Role</div>
            <div style={{fontSize:20,fontWeight:800,color:C.g800}}>{editRole.role}</div>
            <div style={{fontSize:12,color:C.g500,marginTop:4}}>{editRole.desc}</div>
          </div>
          <button onClick={()=>{setEditRole(null);setEditPerms(null)}} style={{background:C.g100,border:"none",width:32,height:32,borderRadius:8,fontSize:16,color:C.g500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:14}}>
          <span style={roleBadge(editRole.role)}>{editRole.role}</span>
          <span style={{fontSize:11,color:C.g400}}>{staffData.filter(s=>s.role===editRole.role).length} staff member{staffData.filter(s=>s.role===editRole.role).length!==1?"s":""} assigned</span>
        </div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"0 30px"}}>
        <div style={{padding:"20px 0 10px"}}><div style={{fontSize:14,fontWeight:800,color:C.g800,marginBottom:4}}>Permission Access</div><div style={{fontSize:12,color:C.g400}}>Toggle individual permissions for this role across all features</div></div>
        {/* Permission matrix */}
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"0 2px",fontSize:12}}>
          <thead><tr>
            <th style={{textAlign:"left",padding:"10px 12px",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em"}}>Feature</th>
            {permTypes.map(p=><th key={p} style={{textAlign:"center",padding:"10px 8px",fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",width:70}}>{p}</th>)}
          </tr></thead>
          <tbody>{permFeatures.map((feat,fi)=>{
            const perms=editPerms?editPerms[feat]||[]:editRole.perms[feat]||[];
            return <tr key={feat} style={{background:fi%2===0?C.blueL+"40":C.w}}>
              <td style={{padding:"12px",fontWeight:700,color:C.g700,borderRadius:"8px 0 0 8px"}}>{permLabels[feat]}</td>
              {permTypes.map(pt=><td key={pt} style={{textAlign:"center",padding:"8px",...(pt==="delete"?{borderRadius:"0 8px 8px 0"}:{})}}>
                <div onClick={()=>editPerms&&togglePerm(feat,pt)} style={{width:24,height:24,borderRadius:6,border:`2px solid ${perms.includes(pt)?C.green:C.g300}`,background:perms.includes(pt)?C.green:C.w,display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:editPerms?"pointer":"default",transition:"all .15s"}}>{perms.includes(pt)&&<span style={{color:C.w,fontSize:14,fontWeight:800,lineHeight:1}}>✓</span>}</div>
              </td>)}
            </tr>})}</tbody>
        </table>
        {/* Assigned staff */}
        <div style={{marginTop:24,paddingBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,color:C.g800,marginBottom:10}}>Assigned Staff ({staffData.filter(s=>s.role===editRole.role).length})</div>
          {staffData.filter(s=>s.role===editRole.role).map(s=><div key={s.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.g100}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:8,background:s.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:11}}>{s.initials}</div>
              <div><div style={{fontSize:13,fontWeight:600,color:C.g700}}>{s.name}</div><div style={{fontSize:11,color:C.g400}}>{s.loc}</div></div>
            </div>
            <span style={{fontSize:11,color:s.status?C.green:C.g400,fontWeight:600}}>{s.status?"Active":"Inactive"}</span>
          </div>)}
        </div>
      </div>
      <div style={{padding:"16px 30px 24px",borderTop:`1px solid ${C.g200}`,display:"flex",gap:10}}>
        {!editPerms?<button onClick={()=>setEditPerms({...editRole.perms})} style={{...btnP,flex:1,justifyContent:"center"}}>✏️ Edit Permissions</button>
        :<><button onClick={()=>{setEditPerms(null)}} style={{...btnP,flex:1,justifyContent:"center",background:C.green}}>💾 Save Changes</button><button onClick={()=>setEditPerms(null)} style={{...btnO,flex:1,display:"flex",justifyContent:"center"}}>Cancel</button></>}
        <button style={{...btnO,color:C.red,borderColor:`${C.red}30`}}>🗑 Delete Role</button>
      </div>
    </SlidePanel>}

    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:14,color:C.g400}}>🔍</span><input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search staff..." style={{padding:"9px 14px 9px 32px",border:`1px solid ${C.g300}`,borderRadius:8,fontSize:13,width:220,fontFamily:font}}/></div>
        <select value={roleFilter} onChange={e=>setRoleFilter(e.target.value)} style={sel}><option value="all">All Roles</option>{roleDefinitions.map(r=><option key={r.role} value={r.role}>{r.role}</option>)}</select>
        <span style={{fontSize:12,color:C.g400}}>{filtered.length} staff member{filtered.length!==1?"s":""}</span>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={()=>setShowRoles(!showRoles)} style={{...btnO,color:C.blue,borderColor:`${C.blue}40`,background:showRoles?C.blueL:C.w}}>🔐 {showRoles?"Hide":"Manage"} Roles</button>
        <button style={btnP}><span style={{fontSize:15}}>+</span> Invite Staff</button>
      </div>
    </div>

    {/* Role Management Panel */}
    {showRoles&&<Card style={{border:`1px solid ${C.blue}20`,background:`linear-gradient(135deg,${C.blueL}40,${C.w})`}}>
      <Sec action={<button style={{...btnP,fontSize:12,padding:"6px 14px"}}>+ Create Role</button>}>Role Definitions</Sec>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
        {roleDefinitions.map(rd=>{const count=staffData.filter(s=>s.role===rd.role).length;const permCount=Object.values(rd.perms).flat().length;
          return <div key={rd.role} onClick={()=>{setEditRole(rd);setEditPerms(null)}} style={{padding:"18px",background:C.w,borderRadius:12,border:`1px solid ${C.g200}`,cursor:"pointer",transition:"all .15s",position:"relative",overflow:"hidden"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=rd.color;e.currentTarget.style.boxShadow=`0 2px 12px ${rd.color}18`}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.g200;e.currentTarget.style.boxShadow="none"}}>
            <div style={{position:"absolute",top:-10,right:-10,width:50,height:50,borderRadius:"50%",background:rd.color,opacity:0.06}}/>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{width:10,height:10,borderRadius:5,background:rd.color}}/>
              <span style={{fontSize:14,fontWeight:800,color:C.g800}}>{rd.role}</span>
            </div>
            <div style={{fontSize:11,color:C.g500,lineHeight:1.5,marginBottom:12,minHeight:34}}>{rd.desc}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:10,fontSize:11,color:C.g400}}>
                <span><span style={{fontWeight:800,color:C.g600}}>{count}</span> staff</span>
                <span><span style={{fontWeight:800,color:C.g600}}>{permCount}</span> perms</span>
              </div>
              <span style={{fontSize:11,color:C.blue,fontWeight:700}}>Edit →</span>
            </div>
            {/* Mini permission preview */}
            <div style={{display:"flex",gap:3,marginTop:10,flexWrap:"wrap"}}>{permFeatures.slice(0,6).map(f=>{const has=(rd.perms[f]||[]).length>0;return <span key={f} style={{padding:"2px 6px",borderRadius:4,fontSize:9,fontWeight:700,background:has?`${rd.color}12`:C.g100,color:has?rd.color:C.g300}}>{permLabels[f].slice(0,5)}</span>})}</div>
          </div>})}
      </div>
      {/* Quick comparison matrix */}
      <div style={{marginTop:16,overflowX:"auto"}}>
        <div style={{fontSize:11,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Permission Comparison</div>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"0 2px",fontSize:11}}>
          <thead><tr><th style={{textAlign:"left",padding:"8px 10px",fontSize:10,fontWeight:700,color:C.g400}}>Feature</th>{roleDefinitions.map(rd=><th key={rd.role} style={{textAlign:"center",padding:"8px 6px",fontSize:10,fontWeight:700,color:rd.color,minWidth:80}}>{rd.role.replace(" ","\n")}</th>)}</tr></thead>
          <tbody>{permFeatures.map((f,fi)=><tr key={f} style={{background:fi%2===0?C.g50:C.w}}>
            <td style={{padding:"8px 10px",fontWeight:600,color:C.g700,borderRadius:"6px 0 0 6px"}}>{permLabels[f]}</td>
            {roleDefinitions.map(rd=>{const p=rd.perms[f]||[];return <td key={rd.role} style={{textAlign:"center",padding:"6px",...(rd===roleDefinitions[roleDefinitions.length-1]?{borderRadius:"0 6px 6px 0"}:{})}}>
              {p.length===0?<span style={{color:C.g300,fontSize:13}}>-</span>
              :p.length===4?<span style={{background:C.greenL,color:C.green,padding:"2px 8px",borderRadius:4,fontWeight:700,fontSize:10}}>Full</span>
              :<span style={{background:C.orangeL,color:C.orange,padding:"2px 8px",borderRadius:4,fontWeight:700,fontSize:10}}>{p.length===1?"R":p.length===2?"R/C":"R/C/U"}</span>}
            </td>})}
          </tr>)}</tbody>
        </table>
      </div>
    </Card>}

    {/* Info banner */}
    <div style={{padding:"10px 16px",background:C.g50,borderRadius:10,border:`1px solid ${C.g200}`,display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:14}}>ℹ️</span>
      <span style={{fontSize:12,color:C.g500}}>Participant organizations (Bayou City Volleyball, Gonzales FC, etc.) manage their own accounts externally. This panel manages district staff access only.</span>
    </div>

    {/* Staff table */}
    <Card>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr>{["","Staff Member","Email","Role","Campus","Phone","Last Active",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>{filtered.map((u,i)=><tr key={u.name} style={{background:i%2===0?C.g50:C.w}}>
          <td style={TD}><div style={{width:38,height:20,borderRadius:10,background:u.status?C.green:C.g300,position:"relative",cursor:"pointer"}}><div style={{width:14,height:14,borderRadius:"50%",background:C.w,position:"absolute",top:3,...(u.status?{right:3}:{left:3}),boxShadow:"0 1px 2px rgba(0,0,0,.2)",transition:"all .15s"}}/></div></td>
          <td style={TD}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:8,background:u.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:10}}>{u.initials}</div><div><span style={{fontWeight:700,color:C.g700,display:"block"}}>{u.name}</span><span style={{fontSize:11,color:C.g400}}>{campusLabel(u.campus)}</span></div></div></td>
          <td style={{...TD,color:C.g500,fontSize:12}}>{u.email}</td>
          <td style={TD}><span style={roleBadge(u.role)}>{u.role}</span></td>
          <td style={{...TD,color:C.g600,fontSize:12}}>{u.loc}</td>
          <td style={{...TD,color:C.g500,fontSize:12}}>{u.phone}</td>
          <td style={{...TD,color:C.g400,fontSize:12}}>{u.updated}</td>
          <td style={TD}><button style={{...btnO,padding:"4px 12px",fontSize:12,color:C.blue,borderColor:`${C.blue}40`}}>Edit</button></td>
        </tr>)}</tbody>
      </table>
    </Card>
  </div>
}

/* ======== PAYMENTS (more rows, mixed statuses) ======== */
function Payments(){
  const [statusFilt,setStatusFilt]=useState("all");
  const filtered=statusFilt==="all"?paymentsData:paymentsData.filter(p=>p.status===statusFilt);
  const totalRev=paymentsData.reduce((s,p)=>s+p.rev,0);
  const failedRev=paymentsData.filter(p=>p.status==="failed").reduce((s,p)=>s+p.rev,0);
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      <Card style={{flex:1,minWidth:150}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Total Processed</div><div style={{fontSize:22,fontWeight:800,color:C.g800}}>${totalRev.toLocaleString()}</div></Card>
      <Card style={{flex:1,minWidth:150}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Successful</div><div style={{fontSize:22,fontWeight:800,color:C.green}}>${(totalRev-failedRev).toLocaleString()}</div></Card>
      <Card style={{flex:1,minWidth:150}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Failed / At Risk</div><div style={{fontSize:22,fontWeight:800,color:C.red}}>${failedRev.toLocaleString()}</div></Card>
      <Card style={{flex:1,minWidth:150}}><div style={{fontSize:10,fontWeight:700,color:C.g400,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Transactions</div><div style={{fontSize:22,fontWeight:800,color:C.g800}}>{paymentsData.length}</div></Card>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
      <div style={{display:"flex",gap:4,background:C.g100,borderRadius:10,padding:3}}>
        {["all","completed","pending","failed"].map(s=><button key={s} onClick={()=>setStatusFilt(s)} style={pill(statusFilt===s)}>{s==="all"?"All":s.charAt(0).toUpperCase()+s.slice(1)}</button>)}
      </div>
      <div style={{display:"flex",gap:10}}>
        <input type="text" placeholder="Search customer..." style={{padding:"9px 14px",border:`1px solid ${C.g300}`,borderRadius:8,fontSize:13,width:190,fontFamily:font}}/>
        <button style={{...btnO,color:C.blue,borderColor:`${C.blue}40`}}>Export CSV</button>
      </div>
    </div>
    <Card><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Date","Asset","Facility","Participant","Revenue","Status"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
      <tbody>{filtered.map((p,i)=><tr key={i} style={{background:i%2===0?C.g50:C.w}}>
        <td style={{...TD,color:C.g500}}><div style={{fontWeight:600,color:C.g700}}>{p.date}</div><div style={{fontSize:11}}>{p.time}</div></td>
        <td style={{...TD,fontWeight:600,color:C.g700}}>{p.asset}</td>
        <td style={{...TD,color:C.g500}}>{p.fac}</td>
        <td style={{...TD,color:C.g600}}>{p.user}</td>
        <td style={{...TD,fontWeight:700}}>${p.rev.toFixed(2)}</td>
        <td style={TD}><span style={statusBadge(p.status)}><span style={{width:6,height:6,borderRadius:"50%",background:"currentColor"}}/>{p.status}</span></td>
      </tr>)}</tbody>
    </table></Card>
  </div>
}

/* ======== APP SHELL ======== */
const pages={Dashboard,Rentals,Organization:Org,Reporting,Users,Payments};
/* shared tab setter - set by App */
let globalSetTab=()=>{};

export default function App(){
  const [tab,setTab]=useState("Dashboard");
  globalSetTab=setTab;
  const [showNotifs,setShowNotifs]=useState(false);
  const [search,setSearch]=useState("");
  const [mobileNav,setMobileNav]=useState(false);
  const [approvals,setApprovals]=useState(approvalsDataInit);
  const [prompt,setPrompt]=useState(null);
  globalApprovals=approvals;globalSetApprovals=setApprovals;globalPrompt=prompt;globalSetPrompt=setPrompt;
  const Page=pages[tab];
  const unread=notifs.filter(n=>!n.read).length;
  const pendingApprovals=approvals.filter(a=>a.status==="pending");

  return <div style={{minHeight:"100vh",background:C.g100,fontFamily:font}}>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
    <style>{`
      *{box-sizing:border-box}
      .pp-header{display:flex;align-items:center;justify-content:space-between;height:58px;padding:0 28px}
      .pp-nav{display:flex;gap:0}
      .pp-nav-btn{background:transparent;border:none;padding:17px 14px;font-size:13px;cursor:pointer;margin-bottom:-1px;transition:all .15s}
      .pp-search{position:relative}
      .pp-search input{width:160px}
      .pp-user-info{display:block}
      .pp-hamburger{display:none;background:none;border:1px solid ${C.g200};border-radius:8px;width:38px;height:38px;cursor:pointer;align-items:center;justify-content:center;font-size:20px}
      .pp-mobile-nav{display:none}
      .pp-main{max-width:1260px;margin:0 auto;padding:22px 28px}
      .pp-notif-panel{width:340px;right:0}

      @media(max-width:1024px){
        .pp-header{padding:0 16px;height:54px}
        .pp-nav-btn{padding:14px 10px;font-size:12px}
        .pp-main{padding:16px}
        .pp-search input{width:120px}
      }

      @media(max-width:768px){
        .pp-header{padding:0 12px;height:50px;gap:8px}
        .pp-nav{display:none}
        .pp-search{display:none}
        .pp-user-info{display:none}
        .pp-hamburger{display:flex}
        .pp-mobile-nav{
          display:${mobileNav?"flex":"none"};
          position:fixed;top:50px;left:0;right:0;bottom:0;z-index:99;
          flex-direction:column;background:${C.w};
          border-top:1px solid ${C.g200};
          animation:slideDown .2s ease;
          overflow-y:auto;
        }
        .pp-main{padding:12px 10px}
        .pp-notif-panel{width:calc(100vw - 24px);right:-40px}
      }

      @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

      @media(max-width:768px){
        table{font-size:12px !important}
        th,td{padding:8px 6px !important}
        .pp-card{padding:14px !important;border-radius:10px !important}
        .pp-card[style*="padding: 0"]{padding:0 !important}
      }

      /* Responsive table wrapper */
      .pp-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -4px;padding:0 4px}

      /* Responsive flex helpers */
      @media(max-width:640px){
        .pp-stack-sm{flex-direction:column !important}
        .pp-hide-sm{display:none !important}
        .pp-full-sm{min-width:100% !important;flex:1 1 100% !important}
      }

      /* Touch-friendly tap targets */
      @media(max-width:768px){
        button{min-height:36px}
        select{min-height:38px}
        input[type="text"]{min-height:38px}
      }

      /* Fix grid columns on mobile */
      @media(max-width:640px){
        [style*="gridTemplateColumns"]{grid-template-columns:1fr !important}
      }
      @media(min-width:641px) and (max-width:768px){
        [style*="repeat(auto-fill"]{grid-template-columns:repeat(auto-fill,minmax(160px,1fr)) !important}
      }
    `}</style>

    <ApprovalPrompt/>
    <header className="pp-header" style={{background:C.w,borderBottom:`1px solid ${C.g200}`,position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:20,minWidth:0}}>
        {/* Hamburger for mobile */}
        <button className="pp-hamburger" onClick={()=>setMobileNav(!mobileNav)} style={{color:C.g600}}>
          {mobileNav?"✕":"☰"}
        </button>
        <img src={LOGO} alt="PracticePlan" style={{height:24,flexShrink:0}}/>
        <nav className="pp-nav">{tabs.map(t=><button key={t} className="pp-nav-btn" onClick={()=>setTab(t)} style={{color:tab===t?C.blue:C.g500,borderBottom:tab===t?`2px solid ${C.blue}`:"2px solid transparent",fontWeight:tab===t?700:600,fontFamily:font}}>{t}</button>)}</nav>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        {/* Search */}
        <div className="pp-search"><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:13,color:C.g400}}>🔍</span><input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{padding:"7px 12px 7px 30px",border:`1px solid ${C.g200}`,borderRadius:8,fontSize:12,fontFamily:font,background:C.g50}}/></div>
        {/* Notifications */}
        <div style={{position:"relative"}}>
          <button onClick={()=>setShowNotifs(!showNotifs)} style={{background:showNotifs?C.blueL:C.g50,border:`1px solid ${showNotifs?`${C.blue}30`:C.g200}`,borderRadius:10,width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,position:"relative"}}>🔔
            {unread>0&&<span style={{position:"absolute",top:-3,right:-3,width:18,height:18,borderRadius:9,background:C.red,color:C.w,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${C.w}`}}>{unread}</span>}
          </button>
          {showNotifs&&<div className="pp-notif-panel" style={{position:"absolute",top:44,background:C.w,borderRadius:14,border:`1px solid ${C.g200}`,boxShadow:"0 8px 30px rgba(0,0,0,0.12)",zIndex:150,overflow:"hidden"}}>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.g200}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:14,fontWeight:800,color:C.g800}}>Notifications</span><div style={{display:"flex",gap:8,alignItems:"center"}}>{pendingApprovals.length>0&&<span style={{background:C.orange,color:C.w,padding:"2px 8px",borderRadius:5,fontSize:10,fontWeight:800}}>{pendingApprovals.length} pending</span>}<span style={{fontSize:11,color:C.g400}}>{unread} unread</span></div></div>
            <div style={{maxHeight:400,overflow:"auto"}}>
              {notifs.map((n,i)=><div key={i} style={{padding:"12px 18px",borderBottom:`1px solid ${C.g100}`,background:n.read?"transparent":n.type==="approval"?`${C.orange}08`:C.blueL+"60",display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:14,marginTop:1}}>{n.type==="alert"?"🔴":n.type==="approval"?"🟠":n.type==="success"?"🟢":"🔵"}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:n.read?500:600,color:C.g700,lineHeight:1.4}}>{n.msg}</div>
                  <div style={{fontSize:11,color:C.g400,marginTop:3}}>{n.time}</div>
                  {n.type==="approval"&&!n.read&&<div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                    <button style={{background:C.green,color:C.w,border:"none",borderRadius:6,padding:"4px 12px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:font}}>Approve</button>
                    <button style={{background:C.w,color:C.red,border:`1px solid ${C.red}30`,borderRadius:6,padding:"4px 12px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:font}}>Deny</button>
                    <button onClick={()=>setTab("Rentals")} style={{background:C.w,color:C.blue,border:`1px solid ${C.blue}30`,borderRadius:6,padding:"4px 12px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:font}}>View Details</button>
                  </div>}
                </div>
                {!n.read&&<span style={{width:8,height:8,borderRadius:4,background:n.type==="approval"?C.orange:C.blue,flexShrink:0,marginTop:5}}/>}
              </div>)}
            </div>
            <div style={{padding:"10px 18px",borderTop:`1px solid ${C.g200}`,textAlign:"center"}}><button style={{background:"none",border:"none",color:C.blue,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:font}}>Mark all as read</button></div>
          </div>}
        </div>
        {/* User */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div className="pp-user-info" style={{fontSize:12,color:C.g500,textAlign:"right"}}><div style={{fontWeight:700,color:C.g700}}>Marcus Williams</div><div>District Admin</div></div>
          <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${C.blue},${C.green})`,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:13,flexShrink:0}}>MW</div>
        </div>
      </div>
    </header>

    {/* Mobile navigation drawer */}
    <div className="pp-mobile-nav">
      {tabs.map(t=><button key={t} onClick={()=>{setTab(t);setMobileNav(false)}} style={{background:tab===t?C.blueL:"transparent",color:tab===t?C.blue:C.g600,border:"none",borderLeft:tab===t?`3px solid ${C.blue}`:"3px solid transparent",padding:"16px 20px",fontSize:15,fontWeight:tab===t?700:600,cursor:"pointer",fontFamily:font,textAlign:"left",transition:"all .15s"}}>{t}</button>)}
      <div style={{padding:"16px 20px",borderTop:`1px solid ${C.g200}`,marginTop:"auto"}}>
        <div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:13,color:C.g400}}>🔍</span><input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{padding:"10px 12px 10px 32px",border:`1px solid ${C.g200}`,borderRadius:8,fontSize:13,width:"100%",fontFamily:font,background:C.g50}}/></div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:14}}>
          <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${C.blue},${C.green})`,display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:13,flexShrink:0}}>MW</div>
          <div style={{fontSize:12,color:C.g500}}><div style={{fontWeight:700,color:C.g700}}>Marcus Williams</div><div>District Admin</div></div>
        </div>
      </div>
    </div>

    <main className="pp-main" onClick={()=>{showNotifs&&setShowNotifs(false);mobileNav&&setMobileNav(false)}}>
      {tab!=="Dashboard"&&<div style={{marginBottom:18}}><h1 style={{margin:0,fontSize:22,fontWeight:800,color:C.g800,letterSpacing:"-0.02em"}}>{tab}</h1><p style={{margin:"3px 0 0",fontSize:12,color:C.g400}}>{tab==="Rentals"?"Locations, reservations, calendar sync, and approval management":tab==="Organization"?"Ascension Parish School District settings and configuration":tab==="Reporting"?"Ratings, revenue, and payout reports by campus and facility":tab==="Users"?"Manage user access and roles across the district":"Payment processing and transaction status"}</p></div>}
      <Page/>
    </main>
  </div>
}
