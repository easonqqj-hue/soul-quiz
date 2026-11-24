(function () {
  'use strict';
  // The catalogue owns IDs, links and titles. This file owns only the gallery treatment.
  var catalog=window.SQ_CATALOG||[];
  var en=window.SQ_LANG==='en',english=window.HUB_EN;
  var themes={
    'linghun-laojia':['#F3EDE3','#2F5D50','#B5482F',14,'postcard',30],
    'dingju-chengshi':['#F5F1E8','#1F3B2D','#C9A227',14,'magazine'],
    'suming-lianren':['#0E1630','#D9DCE6','#FF5C8A','12–14','airport'],
    'nanbei-renge':['#F4F1EC','#3B4A48','#9C3B2B',12,'northsouth',30],
    'qizhi-chengshi':['#EFECE7','#2A2A2A','#B79A6A',12,'perfume',30],
    'lishi-renwu':['#F4EEE2','#2B2926','#A63F2E',16,'history',40],
    'gudai-shenfen':['#EDE3CC','#2F5E73','#5D8A6B',14,'town'],
    'xianxia-juese':['#DDE8EA','#5B7C8C','#C2A15A',14,'immortal',30],
    'gudai-tianfu':['#E4D5B7','#2B2622','#B23A2A',14,'craft',30],
    'gudai-juben':['#8E1B1B','#F2E8D5','#C8A24A','12–14','stage'],
    'lianai-renge':['#F6E7E1','#7A1F2B','#C99A9A',16,'letter',32],
    'xiyin-lianren':['#F4F2F7','#2E2A3A','#B8A8F0',12,'magnet',30],
    'lianai-duanban':['#FAFAF7','#2A2D2E','#4FA89A',12,'medicine'],
    'qinglv-shipei':['#F5F1EA','#2F55D4','#E5484D',12,'couple',32],
    'lianai-juben':['#121110','#F2E6D0','#E27D4C',14,'film'],
    'yincang-tianfu':['#0F2A24','#EFE8DA','#B08D57',14,'gem',35],
    'qizongzui':['#0D0B10','#B8955A','#6E0F1A',14,'glass'],
    'xingge-dise':['#F7F7F5','#111111','#6F8F9B',12,'swatch'],
    'tianfu-saidao':['#C8432F','#FFFFFF','#E3FF3C',14,'track',32],
    'qianyishi-renge':['#1B1433','#EDE6F7','#D8C08A',12,'dream'],
    'yincang-juben':['#C9A97A','#1F1E1C','#A3231F',14,'dossier'],
    'xiaodongwu':['#FBF3DF','#6B4E3D','#8FA77A',14,'animal',32],
    'fenweigan':['#F4F1EC','#1A1A1A','#8C9A86',14,'polaroid'],
    'shenghuo-jiezou':['#EDE5D8','#141414','#E0662F',12,'vinyl'],
    'zhuxian-renwu':['#12131C','#7BD389','#F2C14E',14,'pixel'],
    'daxuesheng':['#FBFAF5','#2B4C9B','#F7E463',14,'notebook'],
    'youxi-wanjia':['#07080D','#2DF5E6','#9B5CFF',14,'hud'],
    'xianxia-menpai':['#F1ECE2','#161514','#C0392B',12,'sect',30],
    'dagongren':['#F4F6F8','#3C4A5C','#FFD95A',14,'badge'],
    'xiaodian':['#22312B','#F3F1EA','#C8553D',14,'shop'],
    'chuangye':['#0A0A0A','#F5F5F0','#39FF88',12,'pitch',30],
    'chongwu-zhuren':['#F6E6D2','#4A3426','#B5733E',14,'pet'],
    'lvyou-dazi':['#D9E6DC','#1E2D4F','#6D4C9F',14,'passport']
  };
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function line(d,color,w,extra){return '<path d="'+d+'" fill="none" stroke="'+color+'" stroke-width="'+(w||1.2)+'" '+(extra||'')+'/>';}
  function rect(x,y,w,h,fill,stroke,extra){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+fill+'"'+(stroke?' stroke="'+stroke+'"':'')+' '+(extra||'')+'/>';}
  function circle(x,y,r,fill,stroke,extra){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'"'+(stroke?' stroke="'+stroke+'"':'')+' '+(extra||'')+'/>';}
  function txt(x,y,s,color,size,extra){return '<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+(size||11)+'" '+(extra||'')+'>'+s+'</text>';}
  function art(t,uid){
    var bg=t[0],ink=t[1],ac=t[2],kind=t[4],s='',i;
    switch(kind){
    case 'postcard':
      s=rect(35,37,250,146,bg,ink)+line('M175 55v109M196 110h62M196 127h62M196 144h46',ink,.8)+rect(219,51,48,45,'none',ink,'stroke-dasharray="3 3"')+line('M226 86h34M230 81V70l12-10 12 10v11M239 81V70h8v11',ink)+circle(113,100,35,'none',ac)+circle(113,100,29,'none',ac)+txt(113,95,'远 方 来 信',ac,10,'text-anchor="middle"')+txt(113,115,'TO : YOU',ac,9,'text-anchor="middle"')+line('M43 143q16-8 32 0t32 0t32 0M43 151q16-8 32 0t32 0t32 0',ac,1.2);break;
    case 'magazine':
      s=rect(63,23,194,177,bg,ink)+txt(77,58,'SETTLE',ink,29,'font-family="Georgia,serif" letter-spacing="3"')+line('M76 69h167M189 82v97M76 184h166',ink,.7)+rect(77,82,99,88,ink)+line('M85 160v-41h18v41m-13-41v-17h18v58m6 0v-55h25v55m9 0V92h17v68',bg,1)+circle(157,98,7,ac)+line('M201 89h39M201 99h25M201 116h39M201 126h29M201 146h36M201 156h23',ink)+txt(77,194,'A PLACE TO STAY',ink,6,'letter-spacing="1.3"');break;
    case 'airport':
      for(i=0;i<4;i++)s+=rect(40+i*61,63,54,64,'#1B2440','#3C4560')+line('M40 95h54',bg,1,'transform="translate('+(i*61)+' 0)"')+txt(67+i*61,108,['D','E','S','T'][i],i===3?ac:ink,36,'font-family="monospace" text-anchor="middle"');
      s+=txt(40,44,'DEPARTURES / 心动待降落',ink,9,'letter-spacing="1"')+txt(42,153,'FROM YOU',ac,12,'font-family="monospace"')+line('M140 149h96',ac,1,'stroke-dasharray="3 4"')+line('m247 144 18 5-18 5 4-5z',ac,1.4)+txt(42,180,'GATE 03     BOARDING SOON','#FFB547',9,'font-family="monospace"');break;
    case 'northsouth':
      s=rect(0,0,160,220,'#6F9C8F')+rect(160,0,160,220,'#9C3B2B')+line('M160 17v186','#F4F1EC',.7)+txt(80,84,'南','#F4F1EC',48,'text-anchor="middle" font-family="serif"')+txt(240,84,'北','#F4F1EC',48,'text-anchor="middle" font-family="serif"')+line('M27 163 60 138l34 25m-56-9v38h46v-38m16 38v-44l28-16 26 16v44','#F4F1EC',1.3)+line('M174 179q28-41 54-10t92-7M187 191q40-20 84 0','#C89B5D',2)+txt(80,117,'雨巷与烟火','#F4F1EC',10,'text-anchor="middle"')+txt(240,117,'雪原与长风','#F4F1EC',10,'text-anchor="middle"');break;
    case 'perfume':
      s=circle(173,111,69,'#E7E0D6')+rect(208,53,24,130,'#FAF8F3',ac,'transform="rotate(14 220 118)"')+rect(118,42,64,25,ink)+rect(127,67,46,13,'none',ac)+rect(99,80,102,112,'none',ink,'rx="7"')+rect(111,102,78,65,'#F8F5EF',ac)+txt(150,124,'N° 05',ink,18,'font-family="Georgia,serif" text-anchor="middle"')+txt(150,145,'气质之城',ink,12,'text-anchor="middle"')+line('M105 180h89M118 90h20',ac)+txt(41,52,'EAU',ac,11,'letter-spacing="3"');break;
    case 'history':
      s=rect(45,23,230,174,'none','#A8895A')+rect(51,29,218,162,'none','#C6B28C')+line('M52 174q36-32 61-12t43-17 41 15 35-8 36 3','#2E4B4A',1.5)+txt(86,81,'知',ink,34,'font-family="serif"')+txt(86,125,'己',ink,34,'font-family="serif"')+txt(134,101,'千',ink,34,'font-family="serif"')+txt(134,145,'年',ink,34,'font-family="serif"')+rect(205,53,40,46,ac,null,'rx="3" transform="rotate(6 225 76)"')+txt(225,72,'照',bg,15,'text-anchor="middle" font-family="serif"')+txt(225,89,'鉴',bg,15,'text-anchor="middle" font-family="serif"')+line('M182 120v39M193 120v25','#A8895A',.7);break;
    case 'town':
      s=line('M12 165h296M22 159v-51h81v51M13 107q45-6 49-23 6 17 50 23M29 117h66M33 124v26m14-26v26m14-26v26m14-26v26m14-26v26M117 165q43-65 86 0M128 165q32-42 64 0M216 160v-39h77v39M209 120l43-29 47 29',ink,1.3)+circle(265,53,22,ac,null,'opacity=".2"')+line('M27 181q20-5 42 0t42 0m79 0q25-5 50 0t50 0',ac)+rect(139,41,42,71,bg,'#8C5A3C','rx="11"')+circle(160,51,3,'none','#8C5A3C')+txt(160,77,'路',ink,18,'text-anchor="middle" font-family="serif"')+txt(160,100,'引',ink,18,'text-anchor="middle" font-family="serif"');break;
    case 'immortal':
      s=circle(221,59,26,'#F6F4E6')+'<path d="M0 184 60 114l28 33 48-88 33 65 28-38 58 83 65-34v85H0Z" fill="#5B7C8C" opacity=".24"/><path d="M0 191q55-48 104-13t96-7 120 6v43H0Z" fill="#EFF4F2"/>'+line('M53 185q45-13 91 0m26 10q49-16 110-4',ink,.6)+line('m170 24-8 103-8 19 11-7 5 12 1-23 10-103zM148 119l42 4M168 19l14 1',ac,1.5)+line('M50 43h38m-19-12v24M245 112h27m-14-12v24',ac,.8);break;
    case 'craft':
      s=rect(50,22,219,178,'none',ink)+line('M67 22v178M194 35v149M60 44h15M60 74h15M60 104h15M60 134h15M60 164h15',ink,.7)+txt(224,65,'天',ink,24,'text-anchor="middle" font-family="serif"')+txt(224,96,'工',ink,24,'text-anchor="middle" font-family="serif"')+line('M210 116h27M210 126h27M210 136h27M210 146h20',ink,.8)+line('M91 122q44 33 87 0M104 122v28q31 14 61 0v-28M97 119h75l-12-26h-49zM130 93v-9h12v9M117 158v12m36-12v12M121 72q-9-9 1-17t1-18M145 73q-9-9 1-17',ink,1.5)+circle(132,130,51,'none',ac,'stroke-width="1" transform="rotate(-13 132 130)"');break;
    case 'stage':
      s=rect(49,25,222,174,'#141012',ac)+line('M62 38h196v148H62z',ac,.8)+'<path d="M0 0h110q-3 71-70 96L0 174ZM320 0H210q3 71 70 96l40 78Z" fill="#641313"/>'+line('M30 0q10 57-22 128M62 0q3 62-37 101M289 0q-10 57 22 128M258 0q-3 62 37 101',ac,.7)+txt(160,91,'人生如戏',ink,27,'font-family="serif" text-anchor="middle" letter-spacing="4"')+line('M103 110h114',ac)+txt(160,140,'主 演 ： 你',ac,14,'text-anchor="middle"')+txt(160,166,'开场，便是好戏。',ink,10,'text-anchor="middle"');break;
    case 'letter':
      s='<g transform="rotate(-8 160 110)">'+rect(61,44,196,132,'#E7CAC3',ac)+rect(78,25,162,117,'#FBF1E9',ac)+line('M98 56h120M98 72h102M98 88h112M98 104h85',ac,.8)+'<path d="m61 84 98 60 98-60v92H61Z" fill="#F6E7E1" stroke="#C99A9A"/>'+line('M61 176l69-61m127 61-69-61',ac,.8)+circle(159,138,23,ink)+circle(159,138,18,'none','#C99A9A')+line('M147 138q-6-16 12-5 18-11 12 5l-12 11z','#E4B7AD',1)+'</g>';break;
    case 'magnet':
      s='<defs><radialGradient id="'+uid+'-gl"><stop stop-color="#FFC2A8"/><stop offset=".45" stop-color="#B8A8F0"/><stop offset=".76" stop-color="#9EE6D0"/><stop offset="1" stop-color="#F4F2F7"/></radialGradient></defs>'+circle(160,106,91,'url(#'+uid+'-gl)')+'<g fill="none" stroke="#FFFFFF" stroke-width="1"><ellipse cx="160" cy="106" rx="101" ry="38" transform="rotate(-25 160 106)"/><ellipse cx="160" cy="106" rx="101" ry="38" transform="rotate(35 160 106)"/></g>'+rect(80,52,160,116,'#FFFFFF',null,'fill-opacity=".24" rx="10"')+circle(160,106,31,'none',ink,'stroke-width=".7"')+txt(160,112,'心 动',ink,16,'text-anchor="middle"')+circle(248,62,6,'#FFFFFF')+txt(160,190,'A LITTLE ATTRACTION',ink,8,'letter-spacing="2" text-anchor="middle"');break;
    case 'medicine':
      s='<g transform="rotate(8 225 124)">'+rect(175,51,91,140,bg,ac)+line('M185 98h70M185 110h70M185 122h65M185 134h70M185 146h55M185 158h70',ac,.8)+'</g>'+rect(57,42,133,147,bg,ac)+rect(57,42,133,29,ac)+txt(70,62,'心动使用说明',bg,12)+line('M77 95h29m-14-14v28',ac,4)+txt(76,135,'恋爱解药',ink,21)+txt(76,155,'先读懂，再靠近',ink,9)+rect(75,169,77,8,ink)+line('M81 169v8m6-8v8m9-8v8m11-8v8m5-8v8m13-8v8m6-8v8',bg,2)+circle(173,84,6,'#D2423A');break;
    case 'couple':
      s=rect(25,53,270,118,'#E9E5DD')+rect(34,61,252,102,'none',ink)+line('M160 54v115',ink,1,'stroke-dasharray="3 5"')+circle(122,112,39,ac,null,'fill-opacity=".82"')+circle(191,112,39,ink,null,'fill-opacity=".75"')+txt(111,125,'A',bg,36,'font-family="Georgia,serif" text-anchor="middle"')+txt(202,125,'B',bg,36,'font-family="Georgia,serif" text-anchor="middle"')+circle(160,53,8,bg)+circle(160,171,8,bg)+txt(160,194,'TWO OF US',ink,10,'text-anchor="middle" letter-spacing="3"');break;
    case 'film':
      s=rect(49,0,222,220,'#1E1D1A')+rect(66,15,188,164,ac)+circle(198,69,26,'#F2D5A1')+'<path d="M66 142q43-34 86-2t102-8v47H66Z" fill="#4C7A7A"/>'+line('M158 88v69m-11-45 11-14 13 14m-13 16-11 34m11-34 12 34',bg,2)+rect(66,154,188,25,'#121110')+txt(160,171,'这一次，你是主角。',bg,11,'text-anchor="middle"')+txt(160,205,'A LOVE STORY',bg,14,'font-family="Georgia,serif" font-style="italic" text-anchor="middle"');
      for(i=0;i<9;i++)s+=rect(53,6+i*25,7,13,bg)+rect(260,6+i*25,7,13,bg);break;
    case 'gem':
      s=rect(40,26,240,167,'none',ac)+line('M50 36h16m-16 0v16m220-16h-16m16 0v16M50 183h16m-16 0v-16m220 16h-16m16 0v-16',ac,2)+'<path d="m160 43 52 33 10 51-62 39-62-39 10-51Z" fill="#375C50" stroke="#B08D57"/><path d="m160 43 25 53-25 70-24-70Z" fill="#7B9F83"/><path d="m108 76 28 20-38 31m114-51-27 20 37 31M136 96h49" fill="none" stroke="#E7D0A5"/>'+rect(103,174,114,24,'#EFE8DA')+txt(160,190,'天赋 · 待发掘',bg,10,'text-anchor="middle"');break;
    case 'glass':
      s='<path d="M89 195V90Q89 51 160 19q71 32 71 71v105Z" fill="#241B29" stroke="#B8955A" stroke-width="2"/><path d="M102 184V92q0-30 58-60 58 30 58 60v92Z" fill="#6E0F1A" stroke="#B8955A"/><path d="m160 32 0 152M102 91h116M102 145h116M102 91l116 54M218 91l-116 54" fill="none" stroke="#B8955A" stroke-width="2"/>'+circle(160,91,27,'#443354',ac)+line('m160 71 7 13 15 7-15 7-7 13-7-13-15-7 15-7z',ink,1)+txt(160,172,'VII',ink,20,'font-family="Georgia,serif" text-anchor="middle"')+line('M73 195h174',ink,1);break;
    case 'swatch':
      s='<g transform="rotate(-12 160 111)">'+rect(52,40,106,153,'#F1D27A',ink)+rect(52,147,106,46,'#FFFFFF',ink)+'</g><g transform="rotate(12 160 111)">'+rect(162,35,106,153,'#BD7B73',ink)+rect(162,142,106,46,'#FFFFFF',ink)+'</g>'+rect(111,25,107,162,'#6F8F9B',ink)+rect(111,137,107,50,'#FFFFFF',ink)+txt(121,158,'性格底色',ink,12)+txt(121,175,'#6F8F9B',ink,10,'font-family="monospace"')+circle(165,81,26,'none','#DFE7E8');break;
    case 'track':
      for(i=0;i<5;i++)s+='<path d="M'+(38+i*31)+' 240V107a'+(110-i*16)+' '+(110-i*16)+' 0 0 1 '+(220-i*32)+' 0v133" fill="none" stroke="#FFFFFF" stroke-width="1" opacity=".7"/>';
      s='<g transform="rotate(14 160 110)">'+s+'</g>'+rect(100,61,120,91,ac)+circle(110,71,2,bg)+circle(210,71,2,bg)+txt(160,120,'GO',bg,48,'font-family="Arial,sans-serif" font-weight="900" font-style="italic" text-anchor="middle"')+txt(160,141,'找到你的赛道',bg,10,'text-anchor="middle"');break;
    case 'dream':
      s=circle(207,62,40,ink)+circle(224,51,38,bg)+line('M25 177h93v-20h24v-20h24v-20h24v-20h24',ink,1.5)+'<path d="M70 220v-44h47v-20h25v-20h24v-20h24v-20h24v124Z" fill="#6C7BB5" opacity=".3"/>'+line('M135 136v84m25-102v102m24-122v122',ink,.6)+circle(58,58,2,ac)+circle(119,37,1.5,ac)+circle(264,118,2,ac)+line('m83 92 6-10 6 10-6 10z',ac,1)+txt(234,183,'梦 的 另 一 面',ink,8,'transform="rotate(-90 234 183)"');break;
    case 'dossier':
      s='<g transform="rotate(-6 160 110)">'+rect(72,34,190,156,'#E9D5AF',ink)+line('M87 56h90M87 67h135M87 79h117',ink,.8)+'<path d="M43 86h92l17 16h125v91H43Z" fill="#C9A97A" stroke="#1F1E1C"/>'+rect(65,121,186,47,'none',ac)+txt(158,150,'CONFIDENTIAL',ac,17,'font-family="monospace" text-anchor="middle"')+line('M222 26v44q0 10 10 10t10-10V36q0-7-7-7t-7 7v30',ink,2)+'</g>';break;
    case 'animal':
      s=circle(160,113,77,'#E4E8CF')+'<path d="m119 96-4-49q20 4 31 31m30 0q11-27 31-31l-4 49" fill="#F2B5A0" stroke="#6B4E3D" stroke-width="1.6"/><path d="M116 92q44-33 88 0 18 27-3 54-41 31-82 0-21-27-3-54Z" fill="#FBF3DF" stroke="#6B4E3D" stroke-width="1.6"/>'+circle(143,112,2.5,ink)+circle(177,112,2.5,ink)+'<path d="m155 124 5 6 5-6z" fill="#6B4E3D"/>'+line('M160 130v8m0-2q-8 8-14 0m14 0q8 8 14 0M106 121l24 3m-25 10 24-2m61-8 24-3m-23 11 24 2',ink,1.2)+line('M67 169q-4-20 10-32m-8 25-13-5m15-3 13-4M239 179q12-18 6-38m-2 17-11-6m12 20 13-5',ac,1.5);break;
    case 'polaroid':
      s='<g transform="rotate(-12 128 110)">'+rect(45,36,132,162,'#FFFFFF','#D6D3CC')+rect(55,46,112,117,'#8C9A86')+circle(114,85,22,'#D9B38C')+line('M55 145q44-44 112-9','#DCE1D4',3)+'</g><g transform="rotate(9 212 111)">'+rect(143,29,133,165,'#FFFFFF','#D6D3CC')+rect(153,39,113,116,'#D9B38C')+rect(172,63,58,92,'#8C9A86')+line('M201 63v92M172 109h58','#F4F1EC',2)+txt(209,177,'一瞬间的你',ink,11,'text-anchor="middle"')+'</g>'+rect(163,21,59,17,'#D6CCB5',null,'fill-opacity=".65" transform="rotate(-7 192 30)"');break;
    case 'vinyl':
      s=rect(37,37,161,155,ac)+txt(51,65,'SIDE A',bg,12,'font-family="Georgia,serif"')+txt(51,178,'生活的拍子',bg,13)+circle(197,111,80,ink);
      for(i=0;i<5;i++)s+=circle(197,111,38+i*8,'none','#55534C','stroke-width=".5"');
      s+=circle(197,111,27,'#3E8A8A')+circle(197,111,4,bg)+line('M273 29v44l-25 64',ink,3)+circle(273,29,5,ac)+rect(242,130,10,21,bg,ink,'transform="rotate(25 247 140)"');break;
    case 'pixel':
      s=line('M46 36h228v12h12v124h-12v12H46v-12H34V48h12z',ink,3)+rect(48,50,224,24,'#24392F')+txt(59,67,'QUEST / 主线已刷新',ink,11,'font-family="monospace"')+rect(124,91,59,47,'none',ac)+rect(135,80,36,15,'none',ac)+rect(120,103,67,9,ac)+rect(149,102,10,18,ac)+txt(160,160,'找到你的主线任务',ink,12,'text-anchor="middle"')+rect(58,172,204,4,'#253D31')+rect(58,172,111,4,ink);break;
    case 'notebook':
      for(i=0;i<9;i++)s+=line('M0 '+(25+i*24)+'h320','#BFD3E6',.7);
      for(i=0;i<14;i++)s+=line('M'+(14+i*24)+' 0v220','#BFD3E6',.7);
      s+=rect(57,37,149,147,'#FFFFFF',ink)+rect(66,71,127,17,ac)+txt(79,84,'大学生活观察簿',ink,14)+line('M77 108h104M77 127h86M77 146h104M77 165h76',ink,.8)+rect(187,106,92,82,'#F7E463',null,'transform="rotate(9 233 147)"')+txt(230,141,'今日待办',ink,12,'text-anchor="middle" transform="rotate(9 230 141)"')+txt(230,166,'认识自己',ink,12,'text-anchor="middle" transform="rotate(9 230 166)"')+line('M67 26v31m20-31v31m20-31v31m20-31v31m20-31v31m20-31v31m20-31v31',ink,2);break;
    case 'hud':
      s=line('M34 53V30h41m170 0h41v23M34 167v23h41m170 0h41v-23',ink,2)+line('m160 43 56 32v65l-56 32-56-32V75z',ac,2)+line('m160 59 42 24v49l-42 24-42-24V83z',ink,.7)+line('M94 107h132M160 36v140',ink,.6,'stroke-dasharray="2 4"')+line('m146 101 10 14 21-32',ink,3)+txt(160,201,'PLAYER : YOU',ink,12,'font-family="monospace" text-anchor="middle"')+rect(39,76,34,4,ac)+rect(247,143,34,4,'#FF3D7F');break;
    case 'sect':
      s='<path d="M41 172q15-104 43-125 5 32 21 40-16 39-31 59l37-19-20 29 34-9-23 27Z" fill="#161514" opacity=".9"/>'+line('M127 27v164M269 27v164','#8D8A84',.6)+txt(171,67,'兹',ink,31,'font-family="serif" text-anchor="middle"')+txt(171,107,'录',ink,31,'font-family="serif" text-anchor="middle"')+txt(171,147,'取',ink,31,'font-family="serif" text-anchor="middle"')+txt(225,65,'仙',ink,16,'font-family="serif" text-anchor="middle"')+txt(225,88,'门',ink,16,'font-family="serif" text-anchor="middle"')+txt(225,111,'拜',ink,16,'font-family="serif" text-anchor="middle"')+txt(225,134,'帖',ink,16,'font-family="serif" text-anchor="middle"')+rect(211,153,27,30,ac)+line('M216 159h17v17h-17zm8 0v17M216 167h17',bg,1);break;
    case 'badge':
      s=line('M124 0l28 59h16L196 0',ink,11)+rect(92,55,136,144,'#FFFFFF',ink,'rx="8"')+rect(139,65,42,7,bg,ink,'rx="3"')+rect(106,87,45,50,ac)+circle(128,103,9,ink)+'<path d="M111 133q0-22 17-22t17 22" fill="#3C4A5C"/>'+txt(165,103,'工位',ink,13)+txt(165,124,'居民',ink,13)+line('M107 151h103M107 161h76',ink,.7)+txt(108,184,'ID : WORK-LIFE',ink,9,'font-family="monospace"')+circle(212,69,3,'#34C38F');break;
    case 'shop':
      s=rect(45,70,230,127,'none',ink)+rect(60,89,117,91,'none',ink)+rect(197,89,60,108,'none',ink)+circle(245,149,2,ink)+txt(119,117,'今日开张',ink,20,'font-family="serif" text-anchor="middle"')+line('M84 132h68M84 143h54M93 154h47',ink,1)+'<path d="M35 72 49 35h222l14 37Z" fill="#F3F1EA"/>';
      for(i=0;i<6;i++)s+='<path d="M'+(51+i*38)+' 35h18l6 37h-25Z" fill="#C8553D"/>';
      s+=line('M35 73h250',ink,2)+txt(119,175,'OPEN',ink,10,'letter-spacing="3" text-anchor="middle"');break;
    case 'pitch':
      s=txt(34,49,'MAKE',ink,31,'font-family="Arial,sans-serif" font-weight="700"')+txt(34,82,'IT HAPPEN.',ink,31,'font-family="Arial,sans-serif" font-weight="700"')+line('M35 188h250M35 102v86','#5B5B56',.8)+line('M44 174 87 164 119 172 155 143 192 151 219 117 267 100',ac,2.5)+circle(267,100,4,ac)+txt(38,209,'从一个想法开始',ink,10)+txt(250,209,'01 / ∞',ac,10,'font-family="monospace"');break;
    case 'pet':
      s=rect(52,34,216,151,'#FFF9F0',ac,'rx="21" stroke-width="3"')+rect(65,47,190,126,'none','#DDC4A5','rx="12"')+txt(81,72,'铲屎官资格证',ink,16)+line('M81 84h158',ac,.8)+circle(118,115,10,ac)+circle(142,109,10,ac)+circle(164,120,10,ac)+'<path d="M119 143q17-34 35 0 10 23-18 15-27 9-17-15Z" fill="#B5733E"/>'+line('M187 113h45M187 127h45M187 141h30',ac,1.4)+circle(240,175,23,'#8DB36B')+line('m230 175 7 7 14-16','#FFF9F0',2);break;
    case 'passport':
      for(i=0;i<11;i++)s+='<ellipse cx="160" cy="108" rx="'+(55+i*10)+'" ry="'+(23+i*5)+'" fill="none" stroke="#8DAA9F" stroke-width=".45" transform="rotate('+(i*8)+' 160 108)"/>';
      s+=rect(40,27,240,166,'none',ink)+txt(55,49,'VISA / 下一站见',ink,13)+rect(55,63,65,82,'#F7F5EE',ink)+line('M65 130l24-48 21 48zM64 113h47',ink)+line('M136 75h119M136 91h91M136 107h110',ink,.8)+circle(225,137,30,'none',ac,'stroke-width="2"')+circle(225,137,24,'none',ac)+txt(225,142,'准予出发',ac,10,'text-anchor="middle" transform="rotate(-15 225 137)"')+txt(55,174,'P&lt;YOU&lt;&lt;ANYWHERE&lt;&lt;&lt;&lt;',ink,11,'font-family="monospace"')+txt(55,187,'SOUL&lt;TRAVEL&lt;FOREVER&lt;&lt;',ink,11,'font-family="monospace"');break;
    }
    return '<svg class="card-art" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
  }
  var sections=[
    ['persona','人格天赋','那些习以为常的，也许正是你的光。'],
    ['city','城市','总有一座城，和你说同一种心事。'],
    ['love','恋爱情感','心动有很多种，你是哪一种？'],
    ['fun','情绪娱乐','给日常换个频道，认真玩一会儿。'],
    ['gufeng','历史古风','借一卷旧时光，照见此刻的自己。'],
    ['niche','小众圈层','不必和所有人一样，找到同类就好。']
  ];
  function card(item,section){
    var t=en&&english.themes[item.id]||themes[item.id];
    if(!t)return '';
    var count=t[5]||'20–40',results=t[3];
    var detail=item.couple?'12 种人格 / 10 种关系':results+' 种结果';
    var artwork=art(t,section+'-'+item.id);
    if(en){
      var known=window.HUB_EN_COUNTS&&window.HUB_EN_COUNTS[item.id];
      count=known?known.questions:(item.id==='lishi-renwu'?36:'20–40');
      detail=known?known.results+' outcomes':(english.themes[item.id]?results+' outcomes':'10–16 outcomes');
      artwork=english.art(t[4],section+'-'+item.id)||english.localize(artwork);
    }
    return '<a class="quiz-card" data-quiz-id="'+esc(item.id)+'" href="'+esc(item.dir)+'/index.html'+(en?'?lang=en':'')+'" style="--tile-bg:'+t[0]+';--tile-ink:'+t[1]+'"><div class="art-frame">'+artwork+(item.couple?'<span class="couple-badge">'+(en?'For two':'双人')+'</span>':'')+'</div><div class="card-copy"><h3>'+esc(en?item.shortEn:item.short)+'</h3><p>'+esc(en?item.titleEn:item.title)+'</p><div class="card-meta"><span>'+count+(en?' questions':' 题')+'</span></div></div></a>';
  }
  document.getElementById('test-count').textContent=catalog.length;
  document.getElementById('collections').innerHTML=sections.map(function(section){
    var items=catalog.filter(function(item){return item.sec===section[0]||(section[0]==='niche'&&item.alsoNiche);});
    var name=en?catalog.find(function(item){return item.sec===section[0];}).catEn:section[1];
    if(en)document.querySelector('.nav-inner a[href="#'+section[0]+'"]').textContent=name;
    return '<section class="collection" id="'+section[0]+'" aria-labelledby="title-'+section[0]+'"><div class="section-heading"><div class="section-title"><h2 id="title-'+section[0]+'">'+esc(name)+'</h2><span>'+items.length+(en?' quizzes':' 个入口')+'</span></div><p>'+(en?english.descriptions[section[0]]:section[2])+'</p></div><div class="quiz-grid">'+items.map(function(item){return card(item,section[0]);}).join('')+'</div></section>';
  }).join('');
  document.getElementById('random-quiz').addEventListener('click',function(){
    if(!catalog.length)return;
    // Select unique tests, so the extra 08 placement does not increase its chance.
    location.href=catalog[Math.floor(Math.random()*catalog.length)].dir+'/index.html'+(en?'?lang=en':'');
  });
  var links=Array.prototype.slice.call(document.querySelectorAll('.nav-inner a'));
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){links.forEach(function(a){if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-10% 0px -65% 0px',threshold:0});
    document.querySelectorAll('.collection').forEach(function(section){observer.observe(section);});
  }
})();
