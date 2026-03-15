/* ═══════════════════════════════════════════════════════════════
   ARF v6 · app.js  ·  W3C Vanilla JS  ·  ES2022
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Colour helpers (matches CSS vars) ──────────────────────────
const C = {
  lime:'#4ade80', teal:'#34d399', cyan:'#60a5fa', amber:'#fbbf24',
  orange:'#fb923c', red:'#f87171', gold:'#fcd34d', blue:'#818cf8',
  dim:'#7a9ab8', text:'#dde6f0', bright:'#f4f8fc', bdr:'#1c2e44',
  bdr2:'#253d58', s2:'#131f2e', muted:'#0f1c2d',
};
const pCol = p =>
  p >= 0.78 ? C.lime  : p >= 0.65 ? C.teal  : p >= 0.55 ? C.cyan  :
  p >= 0.45 ? C.amber : p >= 0.35 ? C.orange : C.red;
const pCls = p =>
  p >= 0.78 ? 'prob-elite' : p >= 0.65 ? 'prob-high' : p >= 0.55 ? 'prob-mid' :
  p >= 0.45 ? 'prob-neutral' : p >= 0.35 ? 'prob-low'  : 'prob-danger';

const discCol = { CONFIRM:C.lime, NEW:C.cyan, WARN:C.amber, CRITICAL:C.red, MISS:C.red };
const discBg  = { CONFIRM:'rgba(74,222,128,0.1)', NEW:'rgba(96,165,250,0.1)',
                  WARN:'rgba(251,191,36,0.1)',    CRITICAL:'rgba(248,113,113,0.1)', MISS:'rgba(248,113,113,0.1)' };
const sevCol  = { HARD:C.red, HIGH:C.amber, MED:C.cyan, RETIRED:C.dim };
const stCol   = { CONFIRMED:C.lime, NEW:C.cyan, UPDATED:C.amber, RETIRED:C.dim, ELEVATED:C.red };

const mlStr = v => v >= 0 ? `+${v}` : `${v}`;
const mlFromProb = p => p >= 0.5 ? Math.round(-100*p/(1-p)) : Math.round(100*(1-p)/p);
const clamp = (v,lo,hi) => Math.max(lo,Math.min(hi,v));

// ── DATA ────────────────────────────────────────────────────────

const TEAM_STATS = {
  ATL:{rim:64,ato:2.2,pip:54,ts:60,ortg:116,stl:8, fb:18,bench:34,drtg:110,sc:54},
  BKN:{rim:56,ato:1.6,pip:48,ts:55,ortg:107,stl:6, fb:13,bench:26,drtg:118,sc:49},
  BOS:{rim:72,ato:2.9,pip:56,ts:64,ortg:122,stl:9, fb:18,bench:38,drtg:106,sc:57},
  CHA:{rim:60,ato:2.0,pip:52,ts:58,ortg:112,stl:8, fb:16,bench:32,drtg:113,sc:52},
  CHI:{rim:65,ato:2.0,pip:55,ts:59,ortg:113,stl:8, fb:18,bench:38,drtg:110,sc:54},
  CLE:{rim:68,ato:2.4,pip:54,ts:61,ortg:116,stl:8, fb:14,bench:36,drtg:107,sc:56},
  DAL:{rim:58,ato:1.8,pip:48,ts:56,ortg:107,stl:7, fb:12,bench:28,drtg:120,sc:50},
  DEN:{rim:68,ato:2.9,pip:58,ts:62,ortg:120,stl:8, fb:16,bench:38,drtg:108,sc:57},
  DET:{rim:66,ato:2.3,pip:54,ts:62,ortg:118,stl:9, fb:20,bench:50,drtg:105,sc:54},
  GSW:{rim:60,ato:2.5,pip:50,ts:57,ortg:110,stl:8, fb:17,bench:42,drtg:114,sc:53},
  HOU:{rim:62,ato:2.3,pip:52,ts:58,ortg:113,stl:9, fb:18,bench:32,drtg:109,sc:53},
  IND:{rim:58,ato:1.7,pip:52,ts:56,ortg:112,stl:7, fb:18,bench:28,drtg:117,sc:53},
  LAC:{rim:70,ato:2.3,pip:60,ts:62,ortg:122,stl:9, fb:20,bench:48,drtg:104,sc:55},
  LAL:{rim:68,ato:2.4,pip:58,ts:61,ortg:118,stl:9, fb:18,bench:40,drtg:107,sc:55},
  MEM:{rim:60,ato:1.8,pip:48,ts:57,ortg:112,stl:8, fb:14,bench:34,drtg:111,sc:51},
  MIA:{rim:62,ato:2.0,pip:52,ts:58,ortg:113,stl:8, fb:16,bench:32,drtg:109,sc:53},
  MIL:{rim:64,ato:2.1,pip:54,ts:59,ortg:114,stl:8, fb:16,bench:30,drtg:109,sc:54},
  MIN:{rim:68,ato:2.3,pip:55,ts:59,ortg:116,stl:9, fb:15,bench:32,drtg:105,sc:55},
  NOP:{rim:60,ato:1.8,pip:48,ts:56,ortg:111,stl:7, fb:14,bench:26,drtg:112,sc:50},
  NYK:{rim:66,ato:2.7,pip:57,ts:60,ortg:117,stl:9, fb:15,bench:38,drtg:108,sc:55},
  OKC:{rim:72,ato:3.2,pip:60,ts:64,ortg:122,stl:10,fb:22,bench:46,drtg:104,sc:56},
  ORL:{rim:74,ato:2.2,pip:58,ts:60,ortg:115,stl:9, fb:14,bench:34,drtg:106,sc:54},
  PHI:{rim:65,ato:1.8,pip:56,ts:60,ortg:113,stl:9, fb:17,bench:40,drtg:112,sc:54},
  PHX:{rim:65,ato:2.1,pip:54,ts:60,ortg:116,stl:8, fb:16,bench:32,drtg:110,sc:53},
  POR:{rim:58,ato:1.8,pip:48,ts:56,ortg:111,stl:7, fb:14,bench:28,drtg:110,sc:50},
  SAC:{rim:60,ato:2.0,pip:52,ts:58,ortg:112,stl:8, fb:16,bench:32,drtg:113,sc:52},
  SAS:{rim:70,ato:2.8,pip:58,ts:63,ortg:120,stl:10,fb:20,bench:44,drtg:105,sc:55},
  TOR:{rim:62,ato:2.1,pip:52,ts:57,ortg:114,stl:8, fb:15,bench:34,drtg:108,sc:53},
  UTA:{rim:55,ato:1.8,pip:46,ts:54,ortg:104,stl:6, fb:12,bench:24,drtg:116,sc:48},
  WAS:{rim:56,ato:1.7,pip:50,ts:55,ortg:108,stl:7, fb:14,bench:28,drtg:118,sc:50},
};
const DEFAULT_STATS = {rim:62,ato:2.0,pip:52,ts:58,ortg:113,stl:8,fb:16,bench:34,drtg:112,sc:53};

const FEATS = [
  {k:'rim',  n:'At-Rim FG%',  hi:true,  w:0.19, th:70},
  {k:'ato',  n:'A/TO Ratio',  hi:true,  w:0.15, th:3.0},
  {k:'pip',  n:'Paint Pts',   hi:true,  w:0.12, th:50},
  {k:'ts',   n:'True Shoot%', hi:true,  w:0.11, th:60},
  {k:'ortg', n:'Off Rating',  hi:true,  w:0.10, th:114},
  {k:'bench',n:'Bench Pts',   hi:true,  w:0.08, th:35},
  {k:'stl',  n:'Steals',      hi:true,  w:0.07, th:9},
  {k:'fb',   n:'Fast Break',  hi:true,  w:0.07, th:20},
  {k:'drtg', n:'Def Rating',  hi:false, w:0.07, th:106},
  {k:'sc',   n:'2nd Chance%', hi:true,  w:0.04, th:55},
];

const RULES = [
  {id:'R01',sev:'HARD',  st:'CONFIRMED',n:'At-Rim% ≥75% Hard Override',conf:1.00,delta:+0.02,g:7,
   d:'≥75% at-rim FG% by halftime overrides ALL other factors. 7/7 this week. Minimum 16 attempts required (from ORL/MIL). Weight: +0.20.'},
  {id:'R02',sev:'HARD',  st:'CONFIRMED',n:'Hot Streak Beats B2B Fatigue (Home)',conf:0.96,delta:0,g:9,
   d:'Team on 2+ win streak at home beats fatigue penalty. 5/5 this week. Only apply fatigue to teams with LOSS the previous game.'},
  {id:'R03',sev:'HARD',  st:'ELEVATED', n:'Hot Streak Home Beats B2B Road',conf:0.94,delta:+0.04,g:4,
   d:'ELEVATED TO HARD: Hot streak home vs b2b road — 4/4 this week. Requires home team won last game + away played yesterday.'},
  {id:'R04',sev:'HARD',  st:'NEW',      n:'Extreme Blowout Hangover (-10%)',conf:0.92,delta:+0.10,g:2,
   d:'After winning by 35+, apply -10% regression next game. NYK confirmed 0/2 after +39 blowout vs DEN. Mechanism: overconfidence + defensive collapse.'},
  {id:'R05',sev:'HARD',  st:'NEW',      n:'Road Fatigue: 3rd Road in 5 Days (-8%)',conf:0.90,delta:+0.08,g:3,
   d:'Away team on 3rd road game in 5 days → -8% win prob. Confirmed 3/3 retroactively. Home crowd amplifies fatigue effect.'},
  {id:'R06',sev:'HIGH',  st:'ELEVATED', n:'A/TO > 3.5 Primary Signal (> 5.0 = Max)',conf:0.88,delta:+0.05,g:12,
   d:'A/TO > 3.5 + home = 91% win rate. A/TO > 5.0 = MAXIMUM signal (SAS 5.43 → 145pts). Cannot be overridden by single factors alone.'},
  {id:'R07',sev:'HIGH',  st:'CONFIRMED',n:'Elite Closer Absorbs 2 Metric Deficits',conf:0.89,delta:+0.01,g:8,
   d:'OKC, SAS, BOS: elite closers overcome A/TO deficit, paint deficit, or bench deficit — but not ALL three simultaneously.'},
  {id:'R08',sev:'HIGH',  st:'NEW',      n:'Consecutive Home Games Crowd Factor (+5%)',conf:0.78,delta:+0.05,g:2,
   d:'Home team winning previous home game → +5% crowd boost. SAC confirmed (2nd consecutive home win, +16 margin).'},
  {id:'R09',sev:'HIGH',  st:'CONFIRMED',n:'Star Isolation Overrides A/TO When Opponent Fatigued',conf:0.82,delta:+0.04,g:2,
   d:'Star TS% > 65% + 25+ pts overrides team A/TO deficit ONLY when opponent is in fatigue/hangover state.'},
  {id:'R10',sev:'HIGH',  st:'CONFIRMED',n:'Bench Points > 50 = Rhythm Signal (+5%)',conf:0.80,delta:+0.03,g:3,
   d:'Bench > 50 for winning team = in rhythm, +5%. For losing team with bench > 50: HIGH VARIANCE flag.'},
  {id:'R11',sev:'MED',   st:'NEW',      n:'Jokic Rule: DEN Never Truly Out',conf:0.74,delta:+0.06,g:1,
   d:'When Jokic plays, DEN within 10pts in Q4 → 35% comeback probability regardless of model. Never fade DEN late.'},
  {id:'R12',sev:'MED',   st:'CONFIRMED',n:'Paint Dominance ≥55pts = Late-Game Engine',conf:0.82,delta:+0.01,g:7,
   d:'Teams with 55+ paint points have 82% win rate. Paint volume is sustainability metric.'},
  {id:'R13',sev:'RETIRED',st:'RETIRED', n:'Altitude Adjustment [DEAD]',conf:0,delta:0,g:2,
   d:'PERMANENTLY RETIRED. 0/2 when applied. Altitude is fully priced into the market.'},
  {id:'R14',sev:'HARD',  st:'NEW',      n:'Jokic Home/Away Rule',conf:0.82,delta:+0.08,g:1,
   d:'Blowout hangover suppresses DEN ONLY when DEN is home. On road, Jokic isolation absorbs hangover entirely. Validated 1/1.'},
  {id:'R15',sev:'HIGH',  st:'NEW',      n:'Road Fatigue ML-Flip Threshold (Record Gap ≤8)',conf:0.78,delta:+0.06,g:1,
   d:'Road fatigue -8% applies to spread/total compression for ANY record gap. ML FLIP requires record gap ≤8 games.'},
  {id:'R16',sev:'HIGH',  st:'NEW',      n:'Double-Explosion OVER Pattern',conf:0.72,delta:+0.07,g:1,
   d:'When two 40+ win teams both scored 130+ in their previous game, OVER is the structural call. Both offenses in rhythm state.'},
  {id:'R17',sev:'HIGH',  st:'NEW',      n:'Elite Defense Override (dRTG ≤103 + rim% ≥72%)',conf:0.74,delta:+0.09,g:1,
   d:'When opponent has dRTG ≤103 AND rim% ≥72%, hot home streak is overridden — cap that team at 55%. ORL beat MIA 119-117 confirming this.'},
];

const DEBRIEF_DATA = {
  '8': { record:'4/7', tag:'4 UPSETS', tagC:C.red, note:'Hangover + hot-streak rules born', games:[
    {id:'m8a',home:'CLE',away:'BOS',label:'Mar 8 · 12pm',score:{CLE:98,BOS:109},pred:{CLE:50.3,BOS:49.7},correct:true,favored:'BOS',disc:[
      {t:'CONFIRM',msg:'BOS elite closer road: won coin-flip despite CLE home — elite label worth +6% floor.'},
      {t:'CONFIRM',msg:'BOS rim% 72% vs CLE 67% — 5pt gap held as primary decider in tight games.'},
    ]},
    {id:'m8b',home:'LAL',away:'NYK',label:'Mar 8 · 2:30pm',score:{LAL:110,NYK:97},pred:{LAL:41.7,NYK:58.3},correct:false,favored:'NYK',disc:[
      {t:'CRITICAL',msg:'NYK HANGOVER: Came off +39 blowout vs DEN. NYK had 19 TO, dRTG 114. Confirmed: extreme blowout → -10% regression next game.'},
      {t:'CRITICAL',msg:'LAL Luka 35pts/59.5%TS overrode poor A/TO. Star isolation > team A/TO vs fatigued opponent.'},
      {t:'NEW',msg:'NYK rim% collapsed to 57.1% — hot-streak rim compression confirmed. Next-game rim% regresses 8–12pts after blowout.'},
    ]},
    {id:'m8c',home:'TOR',away:'DAL',label:'Mar 8 · 5pm',score:{TOR:122,DAL:92},pred:{TOR:78.6,DAL:21.4},correct:true,favored:'TOR',disc:[
      {t:'CONFIRM',msg:'DAL structural collapse: rim% 52%, TS 45%, dRTG 123. Blowout loss b2b = 0/3 this week vs home favorites.'},
    ]},
    {id:'m8d',home:'MIA',away:'DET',label:'Mar 8 · 5pm',score:{MIA:121,DET:110},pred:{MIA:47,DET:53},correct:false,favored:'DET',disc:[
      {t:'WARN',msg:'DET b2b without penalty. MIA hot streak home overrode b2b road DET.'},
      {t:'CONFIRM',msg:'Hot streak home wins against b2b road teams: 4/4 this week. ELEVATED to HARD.'},
    ]},
    {id:'m8e',home:'NOP',away:'WAS',label:'Mar 8 · 6pm',score:{NOP:138,WAS:118},pred:{NOP:78.6,WAS:21.4},correct:true,favored:'NOP',disc:[
      {t:'CONFIRM',msg:'WAS road b2b loss: structural collapse as predicted. dRTG 121, A/TO 1.2.'},
    ]},
    {id:'m8f',home:'SAS',away:'HOU',label:'Mar 8 · 7pm',score:{SAS:145,HOU:120},pred:{SAS:65.4,HOU:34.6},correct:true,favored:'SAS',disc:[
      {t:'CONFIRM',msg:'SAS A/TO 5.43 — highest recorded. 38 assists, 8 turnovers. 145pts. A/TO > 5.0 = MAXIMUM SIGNAL confirmed.'},
      {t:'NEW',msg:'SAS bench 57pts: bench > 50 confirmed as leading indicator. Add +5% to MC mean.'},
    ]},
    {id:'m8g',home:'MIL',away:'ORL',label:'Mar 8 · 7pm',score:{MIL:91,ORL:130},pred:{MIL:40.1,ORL:59.9},correct:true,favored:'ORL',disc:[
      {t:'CONFIRM',msg:'ORL rim% 86.2% — MAXIMUM HARD OVERRIDE triggered. 25/29 at rim. Banchero 33pts.'},
      {t:'CRITICAL',msg:'MIL high rim% (92.3%) from tiny sample (13 att). High rim% on <16 att is unreliable.'},
    ]},
  ]},
  '9': { record:'5/8', tag:'3 UPSETS', tagC:C.amber, note:'Road fatigue + consec-home discovered', games:[
    {id:'m9a',home:'CLE',away:'PHI',label:'Mar 9 · 6pm',score:{CLE:115,PHI:101},pred:{CLE:62,PHI:38},correct:true,favored:'CLE',disc:[
      {t:'CONFIRM',msg:'CLE home structural edge held. PHI low-TS road weakness confirmed.'},
    ]},
    {id:'m9b',home:'OKC',away:'DEN',label:'Mar 9 · 6:30pm',score:{OKC:129,DEN:126},pred:{OKC:72,DEN:28},correct:true,favored:'OKC',disc:[
      {t:'WARN',msg:'DEN covered within 3 — much closer than 72% implied. Jokic never eliminated until final buzzer.'},
      {t:'NEW',msg:'JOKIC RULE: Never assign >28% ceiling to DEN loss margin in parlay totals.'},
    ]},
    {id:'m9c',home:'BKN',away:'MEM',label:'Mar 9 · 6:30pm',score:{BKN:126,MEM:115},pred:{BKN:38,MEM:62},correct:false,favored:'MEM',disc:[
      {t:'CRITICAL',msg:'BKN HOME UPSET: MEM 3rd road in 5 days — extended road fatigue rule confirmed. BKN won at home despite worst record.'},
      {t:'NEW',msg:'ROAD FATIGUE: Away team on 3rd road in 5 days → -8% win probability. Confirmed 2/2.'},
    ]},
    {id:'m9d',home:'UTA',away:'GSW',label:'Mar 9 · 8pm',score:{UTA:119,GSW:116},pred:{UTA:42,GSW:58},correct:false,favored:'GSW',disc:[
      {t:'WARN',msg:'UTA home upset vs GSW 58% favorite. UTA bounce-back at home: 5/5 this week — elevated.'},
    ]},
    {id:'m9e',home:'LAC',away:'NYK',label:'Mar 9 · 9pm',score:{LAC:126,NYK:118},pred:{LAC:40,NYK:60},correct:false,favored:'NYK',disc:[
      {t:'CRITICAL',msg:'NYK HANGOVER CONFIRMED AGAIN: 0–2 in next 2 games after extreme blowout. RULE IS HARD.'},
    ]},
    {id:'m9f',home:'SAC',away:'CHI',label:'Mar 9 · 8pm',score:{SAC:126,CHI:110},pred:{SAC:42.7,CHI:57.3},correct:false,favored:'CHI',disc:[
      {t:'CRITICAL',msg:'SAC HOME UPSET: Consecutive home games create structural crowd momentum. +5% confirmed.'},
    ]},
    {id:'m9g',home:'PHX',away:'CHA',label:'Mar 9 · 9pm',score:{PHX:111,CHA:99},pred:{PHX:37.7,CHA:62.3},correct:false,favored:'CHA',disc:[
      {t:'CRITICAL',msg:'PHX HOME UPSET: CHA on 3rd road in 5 days. Road fatigue applies retroactively — 3/3 confirmed.'},
    ]},
    {id:'m9h',home:'POR',away:'IND',label:'Mar 9 · 8pm',score:{POR:131,IND:111},pred:{POR:77.1,IND:22.9},correct:true,favored:'POR',disc:[
      {t:'CONFIRM',msg:'POR home structural advantages held cleanly. IND road deficits confirmed.'},
    ]},
  ]},
  '10': { record:'10/11', tag:'1 UPSET', tagC:C.cyan, note:'Buzelis 41pts OT upset (GSW/CHI)', games:[
    {id:'m10a',home:'PHI',away:'MEM',label:'Mar 10 · 6pm',score:{PHI:139,MEM:129},pred:{PHI:57.8,MEM:42.2},correct:true,favored:'PHI',disc:[
      {t:'CONFIRM',msg:'PHI home structural held. MEM road fatigue (-8%) applied — 3rd road in 5 days.'},
    ]},
    {id:'m10b',home:'BKN',away:'DET',label:'Mar 10 · 6:30pm',score:{BKN:100,DET:138},pred:{BKN:9.6,DET:90.4},correct:true,favored:'DET',disc:[
      {t:'CONFIRM',msg:'DET blowout +38. rim% 74%, A/TO 3.9, dRTG 100. 90.4% justified.'},
      {t:'NEW',msg:'BLOWOUT ALERT: DET faces hangover risk Mar 12 vs PHI.'},
    ]},
    {id:'m10c',home:'ATL',away:'DAL',label:'Mar 10 · 6:30pm',score:{ATL:124,DAL:112},pred:{ATL:78.8,DAL:21.2},correct:true,favored:'ATL',disc:[
      {t:'CONFIRM',msg:'DAL double-stack (road fatigue + b2b blowout loss). DAL structural collapse: rim% 52%, TS 44%.'},
    ]},
    {id:'m10d',home:'MIA',away:'WAS',label:'Mar 10 · 6:30pm',score:{MIA:150,WAS:129},pred:{MIA:89.5,WAS:10.5},correct:true,favored:'MIA',disc:[
      {t:'CONFIRM',msg:'MIA EXPLODED: 150 points. Hot streak + consecutive home + WAS road fatigue triple-stack.'},
    ]},
    {id:'m10j',home:'GSW',away:'CHI',label:'Mar 10 · 9pm',score:{GSW:124,CHI:130},pred:{GSW:68.8,CHI:31.2},correct:false,favored:'GSW',disc:[
      {t:'CRITICAL',msg:'GSW UPSET: Buzelis 41pts/67.9%TS in OT. GSW bench 65 = HIGH VARIANCE flag triggered chaos.'},
      {t:'NEW',msg:'BUZELIS BREAKOUT: 2nd-year player 40+ pts → +4% for next 2 games (momentum acceleration).'},
    ]},
    {id:'m10k',home:'LAL',away:'MIN',label:'Mar 10 · 10pm',score:{LAL:120,MIN:106},pred:{LAL:52,MIN:48},correct:true,favored:'LAL',disc:[
      {t:'CONFIRM',msg:'LAL hot + Luka star isolation override held. MIN road advantages didn\'t convert.'},
    ]},
  ]},
  '11': { record:'6/6', tag:'PERFECT 🔥', tagC:C.lime, note:'Rim override vs market (ORL/CLE)', games:[
    {id:'m11a',home:'ORL',away:'CLE',label:'Mar 11 · 6:30pm',score:{ORL:128,CLE:122},pred:{ORL:58,CLE:42},correct:true,favored:'ORL',disc:[
      {t:'CONFIRM',msg:'ORL rim% 75% threshold — Hard Override fired vs CLE -3.5 road favorite. ORL won 128-122. Rule validated against market.'},
      {t:'CONFIRM',msg:'ORL hot streak (5th win) + home + rim override triple-stack. Cleanest rim rule validation this session.'},
    ]},
    {id:'m11b',home:'NOP',away:'TOR',label:'Mar 11 · 7pm',score:{NOP:122,TOR:111},pred:{NOP:62,TOR:38},correct:true,favored:'NOP',disc:[
      {t:'CONFIRM',msg:'TOR 0-rest B2B road. NOP 3rd straight home win by 11+. Road fatigue (-8%) pushed model above market.'},
    ]},
    {id:'m11c',home:'UTA',away:'NYK',label:'Mar 11 · 8pm',score:{UTA:117,NYK:134},pred:{UTA:14,NYK:86},correct:true,favored:'NYK',disc:[
      {t:'CONFIRM',msg:'NYK -950 ML delivered. Won 134-117 (+17). Model 86% correct.'},
    ]},
    {id:'m11d',home:'DEN',away:'HOU',label:'Mar 11 · 8pm',score:{DEN:129,HOU:93},pred:{DEN:72,HOU:28},correct:true,favored:'DEN',disc:[
      {t:'CONFIRM',msg:'DEN +36. HOU double-fatigue (b2b + blowout hangover) overrode Jokic close-game rule.'},
    ]},
    {id:'m11e',home:'SAC',away:'CHA',label:'Mar 11 · 9pm',score:{SAC:109,CHA:117},pred:{SAC:22,CHA:78},correct:true,favored:'CHA',disc:[
      {t:'CONFIRM',msg:'CHA won 117-109 despite road fatigue. Model direction correct; fatigue compressed margin as predicted.'},
    ]},
    {id:'m11f',home:'LAC',away:'MIN',label:'Mar 11 · 9:30pm',score:{LAC:153,MIN:128},pred:{LAC:55,MIN:45},correct:true,favored:'LAC',disc:[
      {t:'CONFIRM',msg:'LAC 153-128 (+25) as mere -1 coin-flip. rim% 71%, bench 48pts, paint 58pts — structural domination.'},
      {t:'NEW',msg:'LAC 153 POINTS. Two 150+ performances in two days (MIA 150). Offensive explosion pattern emerging.'},
    ]},
  ]},
  '12': { record:'8/9', tag:'1 MISS', tagC:C.cyan, note:'Jokic home/away rule (SAS/DEN)', games:[
    {id:'m12a',home:'DET',away:'PHI',label:'Mar 12 · 5pm',score:{DET:131,PHI:109},pred:{DET:78,PHI:22},correct:true,favored:'DET',disc:[
      {t:'CONFIRM',msg:'DET hangover fired but still dominated +22. Rule compressed prediction correctly.'},
      {t:'CONFIRM',msg:'PHI road fatigue confirmed: 1.33 A/TO + 22.9% 3pt%. DET bench 69pts exceptional.'},
    ]},
    {id:'m12b',home:'ORL',away:'WAS',label:'Mar 12 · 5pm',score:{ORL:136,WAS:131},pred:{ORL:88,WAS:12},correct:true,favored:'ORL',disc:[
      {t:'CONFIRM',msg:'ORL rim% override fired: won 136-131 (+5). WAS above structural level. Direction correct, margin overcalibrated.'},
    ]},
    {id:'m12c',home:'IND',away:'PHX',label:'Mar 12 · 5pm',score:{IND:108,PHX:123},pred:{IND:28,PHX:72},correct:true,favored:'PHX',disc:[
      {t:'CONFIRM',msg:'PHX hot road rule confirmed. 3rd consecutive win. Hot road streak > IND consecutive home crowd.'},
    ]},
    {id:'m12d',home:'ATL',away:'BKN',label:'Mar 12 · 5:30pm',score:{ATL:108,BKN:97},pred:{ATL:88,BKN:12},correct:true,favored:'ATL',disc:[
      {t:'CONFIRM',msg:'BKN blowout LOSS hangover confirmed 2nd time this week. ATL controlled pace cleanly.'},
    ]},
    {id:'m12e',home:'MIA',away:'MIL',label:'Mar 12 · 5:30pm',score:{MIA:112,MIL:105},pred:{MIA:72,MIL:28},correct:true,favored:'MIA',disc:[
      {t:'CONFIRM',msg:'MIA hot home confirmed. Closer (112-105, +7). MIL bench HIGH VAR flag kept MIL competitive.'},
    ]},
    {id:'m12g',home:'SAS',away:'DEN',label:'Mar 12 · 7pm',score:{SAS:131,DEN:136},pred:{SAS:62,DEN:38},correct:false,favored:'SAS',disc:[
      {t:'MISS',msg:'ARF HAD SAS 62%. DEN WON 136-131. Jokic 34pts/13ast. Hangover rule failed on DEN road.'},
      {t:'NEW',msg:'JOKIC HOME/AWAY RULE: Hangover suppresses DEN only HOME. 0% penalty for DEN road games post-blowout.'},
    ]},
    {id:'m12h',home:'OKC',away:'BOS',label:'Mar 12 · 7:30pm',score:{OKC:104,BOS:102},pred:{OKC:71,BOS:29},correct:true,favored:'OKC',disc:[
      {t:'CONFIRM',msg:'TWO ELITE CLOSERS: 104-102. Model 71% OKC correct. Home elite closer rule: 3/3 confirmed.'},
    ]},
    {id:'m12i',home:'LAL',away:'CHI',label:'Mar 12 · 8:30pm',score:{LAL:142,CHI:130},pred:{LAL:76,CHI:24},correct:true,favored:'LAL',disc:[
      {t:'CONFIRM',msg:'LAL 142-130. Total 272 — OVER crushed every line. Two hot offenses + no fatigue.'},
      {t:'NEW',msg:'DOUBLE-EXPLOSION: Two hot offenses + no fatigue flags = OVER structural call.'},
    ]},
  ]},
  '13': { record:'7/8', tag:'1 MISS', tagC:C.cyan, note:'Road fatigue ML-flip threshold (GSW/MIN)', games:[
    {id:'m13a',home:'DET',away:'MEM',label:'Mar 13 · 5:30pm',score:{DET:126,MEM:110},pred:{DET:92,MEM:8},correct:true,favored:'DET',disc:[
      {t:'CONFIRM',msg:'DET 126-110 (+16). B2B suppressed output slightly but structural quality gap insurmountable.'},
    ]},
    {id:'m13b',home:'DAL',away:'CLE',label:'Mar 13 · 5:30pm',score:{DAL:105,CLE:138},pred:{DAL:13,CLE:87},correct:true,favored:'CLE',disc:[
      {t:'CONFIRM',msg:'CLE BLOWOUT: +33. DAL b2b + dRTG 120 completely exposed. CLE ortg 116 ran wild.'},
      {t:'NEW',msg:'BLOWOUT ALERT: CLE faces hangover risk Mar 15 rematch.'},
    ]},
    {id:'m13c',home:'IND',away:'NYK',label:'Mar 13 · 5:30pm',score:{IND:92,NYK:101},pred:{IND:13,NYK:87},correct:true,favored:'NYK',disc:[
      {t:'CONFIRM',msg:'NYK 101-92 (+9). Road fatigue spread effect: margin compressed from 20+ expected to +9.'},
    ]},
    {id:'m13d',home:'TOR',away:'PHX',label:'Mar 13 · 5:30pm',score:{TOR:122,PHX:115},pred:{TOR:58,PHX:42},correct:true,favored:'TOR',disc:[
      {t:'CONFIRM',msg:'TOR 122-115. PHX b2b road fatigue partially cancelled hot streak. TOR home crowd was the margin.'},
    ]},
    {id:'m13e',home:'HOU',away:'NOP',label:'Mar 13 · 6pm',score:{HOU:107,NOP:105},pred:{HOU:65,NOP:35},correct:true,favored:'HOU',disc:[
      {t:'CONFIRM',msg:'HOU bounce-back delivered 107-105 (+2). Bounce-back rule (+5.2%) was the margin.'},
    ]},
    {id:'m13f',home:'POR',away:'UTA',label:'Mar 13 · 8pm',score:{POR:124,UTA:114},pred:{POR:88,NOP:12},correct:true,favored:'POR',disc:[
      {t:'CONFIRM',msg:'POR 124-114 (+10). UTA ortg 104 couldn\'t keep pace. Clean structural read.'},
    ]},
    {id:'m13g',home:'GSW',away:'MIN',label:'Mar 13 · 8pm',score:{GSW:117,MIN:127},pred:{GSW:52,MIN:48},correct:false,favored:'GSW',disc:[
      {t:'MISS',msg:'ARF FLIPPED to GSW 52% via MIN road fatigue. MIN won 127-117. Record gap was 9 — just outside ML-flip threshold (≤8).'},
      {t:'NEW',msg:'ROAD FATIGUE REFINEMENT: ML flip requires record gap ≤8. Spread/total compression applies for any gap.'},
    ]},
    {id:'m13h',home:'LAC',away:'CHI',label:'Mar 13 · 8:30pm',score:{LAC:119,CHI:108},pred:{LAC:78,CHI:22},correct:true,favored:'LAC',disc:[
      {t:'CONFIRM',msg:'LAC 119-108 (+11). Hangover compressed margin (153→119). CHI Buzelis still contributed.'},
    ]},
  ]},
  '14': { record:'4/4', tag:'PERFECT ✓', tagC:C.lime, note:'AM sweep · Evening: ORL upset + DEN road TBD', games:[
    {id:'m14a',home:'PHI',away:'BKN',label:'Mar 14 · 11am ET',score:{PHI:104,BKN:97},pred:{PHI:72,BKN:28},correct:true,favored:'PHI',disc:[
      {t:'CONFIRM',msg:'PHI 104-97 at home. BKN hangover + structural tank confirmed (3rd time this week).'},
    ]},
    {id:'m14b',home:'ATL',away:'MIL',label:'Mar 14 · 1pm ET',score:{ATL:122,MIL:99},pred:{ATL:68,MIL:32},correct:true,favored:'ATL',disc:[
      {t:'CONFIRM',msg:'ATL 122-99 (+23). Hot home + consec home momentum. MIL road fatigue confirmed.'},
      {t:'NEW',msg:'MIL BOUNCE-BACK CANDIDATE: Apply bounce-back +5% for MIL home vs IND Mar 15.'},
    ]},
    {id:'m14c',home:'SAS',away:'CHA',label:'Mar 14 · 1:30pm ET',score:{SAS:115,CHA:102},pred:{SAS:78,CHA:22},correct:true,favored:'SAS',disc:[
      {t:'CONFIRM',msg:'SAS 115-102. Fox + Wemby structural combo held. SAS now 4/4 as home favorites this session.'},
    ]},
    {id:'m14d',home:'BOS',away:'WAS',label:'Mar 14 · 4pm ET',score:{BOS:111,WAS:100},pred:{BOS:91,WAS:9},correct:true,favored:'BOS',disc:[
      {t:'CONFIRM',msg:'BOS 111-100. Elite closer home vs sub-.400 road: 100% hit rate this session.'},
    ]},
  ]},
};

const LIVE_GAMES = [
  {id:'live01',home:'MIA',away:'ORL',label:'Mar 14 · LIVE Q4 0:08',liveScore:{MIA:117,ORL:119},quarter:4,clock:'00:08',
   arfPred:{MIA:64,ORL:36},marketPred:{MIA:62,ORL:38},status:'FINAL_IMMINENT',arfResult:'MISS',
   disc:[
     {t:'WARN',msg:'ARF HAD MIA 64% — ORL led 119-117 final. MISS. Elite defense override: ORL dRTG 102 + rim% 74 neutralized MIA hot home. R17 born.'},
     {t:'NEW',msg:'ELITE DEFENSE OVERRIDE (R17): dRTG ≤103 + rim% ≥72% overrides hot home streak. Cap hot team at 55%.'},
   ]},
  {id:'live02',home:'LAL',away:'DEN',label:'Mar 14 · LIVE Q4 6:28',liveScore:{LAL:96,DEN:99},quarter:4,clock:'06:28',
   arfPred:{LAL:52,DEN:48},marketPred:{LAL:44,DEN:56},status:'IN_PROGRESS',arfResult:'TBD',
   disc:[
     {t:'WARN',msg:'DEN leading 99-96 in Q4. Jokic road rule validated: no hangover on road (R14). Close game = Jokic +15% hold prob.'},
     {t:'CONFIRM',msg:'Market had DEN -140. ARF had LAL 52% via hot home (R16). DEN road performance validating market read.'},
   ]},
];

// Forward sim: Mar 15
const UPC_TODAY = [
  {id:'u01',g:'Mar 15 · 1pm ET',   home:'OKC',away:'MIN',mH:77,mA:23,hsd:5,asd:6,
   hS:{...TEAM_STATS.OKC,ortg:122,bench:46,pip:60,ts:64,rim:72},
   aS:{...TEAM_STATS.MIN,ortg:116,bench:32,pip:55,ts:59,rim:68},
   hX:{hot:true,el:true,cH:true},aX:{b2b:true},
   note:'OKC 51-15 at home (elite fortress). Elite closer home rule. MIN b2b road after GSW win yesterday. ARF: OKC 74% vs 77% market. UNDER lean — both elite defenses.'},
  {id:'u02',g:'Mar 15 · 1:30pm ET',home:'MIL',away:'IND',mH:73,mA:27,hsd:5,asd:7,
   hS:{...TEAM_STATS.MIL,ortg:114,bench:30,pip:54,ts:59,rim:64},
   aS:{...TEAM_STATS.IND,drtg:117,pip:52},
   hX:{bb:true},aX:{},
   note:'MIL BOUNCE-BACK at home after -23 blowout to ATL. Bounce-back rule +5.2%. IND 15-52 structural tank. ARF: MIL 78% vs 73% market — VALUE LEAN MIL.'},
  {id:'u03',g:'Mar 15 · 1:30pm ET',home:'CLE',away:'DAL',mH:91,mA:9,hsd:4,asd:8,
   hS:{...TEAM_STATS.CLE,ortg:116,bench:36,pip:54,ts:61,rim:68},
   aS:{...TEAM_STATS.DAL,drtg:120,pip:48},
   hX:{hov:true},aX:{bl:true,b2b:true},
   note:'⚠ BLOWOUT HANGOVER: CLE won +33 vs DAL yesterday. HARD RULE -10%. ARF: CLE 81% vs 91% market. DAL structural avoid. UNDER lean — CLE hangover suppresses offense.'},
  {id:'u04',g:'Mar 15 · 1:30pm ET',home:'TOR',away:'DET',mH:40,mA:60,hsd:7,asd:5,
   hS:{...TEAM_STATS.TOR,ortg:114,bench:34,pip:52,ts:57,rim:62},
   aS:{...TEAM_STATS.DET,ortg:118,bench:50,pip:54,ts:62,rim:66},
   hX:{cH:true},aX:{b2b:true},
   note:'DET b2b road after home win yesterday. TOR consec home (+5% crowd). ARF: TOR 46% vs 40% market. Record gap DET(38-28) vs TOR(30-36) = 8 games — boundary for spread compression.'},
  {id:'u05',g:'Mar 15 · 4pm ET',   home:'PHI',away:'POR',mH:29,mA:71,hsd:8,asd:6,
   hS:{...TEAM_STATS.PHI,drtg:112,pip:56},
   aS:{...TEAM_STATS.POR,ortg:111,bench:28,pip:48,ts:56,rim:58},
   hX:{},aX:{},
   note:'PHI (13-51) structural tank despite home court. POR (22-44) structurally better road. ARF aligns 70% POR vs 71% market. No strong regime flags. Fade PHI home.'},
  {id:'u06',g:'Mar 15 · 6pm ET',   home:'NYK',away:'GSW',mH:85,mA:15,hsd:5,asd:7,
   hS:{...TEAM_STATS.NYK,ortg:117,bench:38,pip:57,ts:60,rim:66},
   aS:{...TEAM_STATS.GSW,drtg:114,bench:42},
   hX:{},aX:{b2b:true,rf:true},
   note:'GSW b2b road (lost MIN yesterday). Road fatigue + consecutive away loss. ARF: NYK 87% vs 85% market. GSW bench 42 HIGH VAR flag — record gap too large for ML flip.'},
  {id:'u07',g:'Mar 15 · 8pm ET',   home:'SAC',away:'UTA',mH:62,mA:38,hsd:6,asd:7,
   hS:{...TEAM_STATS.SAC,ortg:112,bench:32,pip:52,ts:58,rim:60},
   aS:{...TEAM_STATS.UTA,drtg:116,pip:46},
   hX:{},aX:{rf:true},
   note:'SAC home vs UTA road (lost POR yesterday). UTA road fatigue. SAC consec home momentum. ARF: SAC 66% vs 62% market. No elite signals.'},
  {id:'u08',g:'Mar 15 · 9:30pm ET',home:'HOU',away:'LAL',mH:52,mA:48,hsd:6,asd:6,
   hS:{...TEAM_STATS.HOU,ortg:113,bench:32,pip:52,ts:58,rim:62},
   aS:{...TEAM_STATS.LAL,ortg:122,bench:44,pip:60,ts:64,rim:70},
   hX:{bb:true},aX:{b2b:true},
   note:'⚠ CONTINGENT: LAL plays DEN tonight (live). If LAL plays this is b2b road. HOU bounce-back (+5%). ARF: HOU 56% if LAL b2b road confirmed. Monitor tonight result.'},
];

// ── Parlay Lab tickets ──────────────────────────────────────────
const ALL_PARLAYS = [
  { id:'t1', label:'Ticket #1',
    meta:{ id:'4704240427', time:'13/03 13:13', stake:10, odds:'+20525', gain:2473.04 },
    legs:[
      {id:'t1l1',away:'MEM',home:'DET',label:'MEM @ DET',bet:'UNDER',line:239.5,odds:-200,impliedProb:0.667,
       awayOrtg:113,awayDrtg:111,homeOrtg:124,homeDrtg:103,pace:105.6,baseMean:221,baseSd:14,
       contextMods:{homeHangover:true,awayRoadFatigue:true},arfLean:'UNDER',arfConf:0.74,
       note:'DET blowout WIN hangover. MEM road fatigue (3rd in 5 days). Two suppressors stacked. DET dRTG 103 elite. ARF: STRONG UNDER — 18.5pt cushion.'},
      {id:'t1l2',away:'CHI',home:'LAC',label:'CHI @ LAC',bet:'UNDER',line:239.5,odds:-182,impliedProb:0.645,
       awayOrtg:114,awayDrtg:109,homeOrtg:122,homeDrtg:103,pace:113.9,baseMean:236,baseSd:16,
       contextMods:{homeHangover:true,awayBuzelisStar:true},arfLean:'UNDER',arfConf:0.56,
       note:'LAC 153-pt explosion → hangover. CHI Buzelis hot. Hangover suppresses LAC. Moderate UNDER — 3.5pt cushion.'},
      {id:'t1l3',away:'MIN',home:'GSW',label:'MIN @ GSW',bet:'OVER',line:232,odds:163,impliedProb:0.380,
       awayOrtg:118,awayDrtg:103,homeOrtg:110,homeDrtg:114,pace:113.5,baseMean:223,baseSd:16,
       contextMods:{awayRoadFatigue:true,homeBounceback:true},arfLean:'UNDER',arfConf:0.58,
       note:'Expected ~223 puts OVER 232 at risk. Road fatigue suppresses MIN further. ARF DISAGREES — UNDER lean.'},
      {id:'t1l4',away:'NOP',home:'HOU',label:'NOP @ HOU',bet:'OVER',line:232.5,odds:106,impliedProb:0.485,
       awayOrtg:116,awayDrtg:106,homeOrtg:113,homeDrtg:110,pace:107.2,baseMean:219,baseSd:15,
       contextMods:{homeHangover:true,homeB2B:true},arfLean:'UNDER',arfConf:0.68,
       note:'HOU 93pts yesterday (DEN blowout -36). DOUBLE STACK: b2b + blowout LOSS hangover. ARF DISAGREES — UNDER.'},
      {id:'t1l5',away:'CLE',home:'DAL',label:'CLE @ DAL',bet:'OVER',line:244,odds:152,impliedProb:0.397,
       awayOrtg:116,awayDrtg:106,homeOrtg:108,homeDrtg:124,pace:109.8,baseMean:234,baseSd:17,
       contextMods:{homeBlowoutRisk:true},arfLean:'UNDER',arfConf:0.62,
       note:'244 is highest line on ticket. Base total ~234. Toughest leg — needs +10 above base. ARF DISAGREES.'},
      {id:'t1l6',away:'PHX',home:'TOR',label:'PHX @ TOR',bet:'OVER',line:225,odds:157,impliedProb:0.388,
       awayOrtg:118,awayDrtg:107,homeOrtg:117,homeDrtg:106,pace:108.4,baseMean:229,baseSd:14,
       contextMods:{awayHot:true},arfLean:'OVER',arfConf:0.60,
       note:'PHX hot (2 wins, 123pts yesterday). Base ~229 sits +4 above line. Only ARF-aligned OVER on ticket. Best value leg.'},
      {id:'t1l7',away:'UTA',home:'POR',label:'UTA @ POR',bet:'UNDER',line:229.5,odds:152,impliedProb:0.397,
       awayOrtg:104,awayDrtg:116,homeOrtg:113,homeDrtg:108,pace:104.8,baseMean:218,baseSd:15,
       contextMods:{awayTankTeam:true},arfLean:'UNDER',arfConf:0.72,
       note:'UTA ortg 104 (tank-level). Base ~218 gives UNDER 229.5 a massive +11.5pt cushion. ARF: STRONG UNDER.'},
    ],
  },
  { id:'t2', label:'Ticket #2',
    meta:{ id:'4704837255', time:'13/03 15:48', stake:65, odds:'+1670', gain:1205.12 },
    legs:[
      {id:'t2l1',away:'MEM',home:'DET',label:'MEM @ DET',bet:'UNDER',line:226,odds:164,impliedProb:0.379,
       awayOrtg:113,awayDrtg:111,homeOrtg:124,homeDrtg:103,pace:105.6,baseMean:221,baseSd:14,
       contextMods:{homeHangover:true,awayRoadFatigue:true},arfLean:'UNDER',arfConf:0.61,
       note:'Same game as T1 but tighter line: 226 vs 239.5. Only +5pt cushion. Lean UNDER — thin.'},
      {id:'t2l2',away:'CHI',home:'LAC',label:'CHI @ LAC',bet:'UNDER',line:228,odds:155,impliedProb:0.392,
       awayOrtg:114,awayDrtg:109,homeOrtg:122,homeDrtg:103,pace:113.9,baseMean:236,baseSd:16,
       contextMods:{homeHangover:true,awayBuzelisStar:true},arfLean:'OVER',arfConf:0.57,
       note:'Tighter line 228. Base 236 is ABOVE this line — ARF now DISAGREES. Dangerous leg.'},
      {id:'t2l3',away:'UTA',home:'POR',label:'UTA @ POR',bet:'UNDER',line:229,odds:163,impliedProb:0.380,
       awayOrtg:104,awayDrtg:116,homeOrtg:113,homeDrtg:108,pace:104.8,baseMean:218,baseSd:15,
       contextMods:{awayTankTeam:true},arfLean:'UNDER',arfConf:0.71,
       note:'229 vs 229.5 in T1. Base 218 still gives +11pt cushion. ARF: STRONG UNDER.'},
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
//  MONTE CARLO ENGINE
// ═══════════════════════════════════════════════════════════════
let _spare = null;
function gauss(mu, sd) {
  if (_spare !== null) { const v = _spare; _spare = null; return mu + sd * v; }
  let u, v, s;
  do { u = Math.random()*2-1; v = Math.random()*2-1; s = u*u+v*v; } while (s>=1||s===0);
  const m = Math.sqrt(-2*Math.log(s)/s);
  _spare = v * m;
  return mu + sd * u * m;
}
const sig = x => 1/(1+Math.exp(-x));

function runMC(g, N=7000) {
  const ps = new Float32Array(N);
  for (let i=0; i<N; i++) {
    let score = (g.mH/100) * 0.30;
    FEATS.forEach(f => {
      const hv = clamp(gauss(g.hS[f.k]||50, g.hsd||7), 0, 200);
      const av = clamp(gauss(g.aS[f.k]||50, g.asd||7), 0, 200);
      const diff = f.hi ? (hv-av) : (av-hv);
      score += (sig(diff * 0.11) - 0.5) * f.w * 0.70;
    });
    const hX = g.hX||{}, aX = g.aX||{};
    if (hX.hot)  score += gauss(0.040,0.015);
    if (hX.bb)   score += gauss(0.052,0.016);
    if (hX.el)   score += gauss(0.032,0.012);
    if (hX.bl)   score -= gauss(0.072,0.020);
    if (hX.b2b && !hX.hot) score -= gauss(0.040,0.015);
    if (hX.rf)   score -= gauss(0.080,0.020);
    if (hX.hov)  score -= gauss(0.085,0.022);
    if (hX.cH)   score += gauss(0.050,0.015);
    if (aX.hot)  score -= gauss(0.040,0.015);
    if (aX.el)   score -= gauss(0.032,0.012);
    if (aX.bl)   score += gauss(0.072,0.020);
    if (aX.b2b && !aX.hot) score += gauss(0.040,0.015);
    if (aX.rf)   score += gauss(0.080,0.020);
    if (aX.hov)  score += gauss(0.085,0.022);
    const atoDiff = (g.hS.ato||2) - (g.aS.ato||2);
    if ((g.hS.ato||2) >= 5.0) score += gauss(0.055,0.015);
    else if ((g.hS.ato||2) >= 3.5 && atoDiff > 0) score += gauss(0.025,0.010);
    if ((g.aS.ato||2) >= 5.0) score -= gauss(0.055,0.015);
    if ((g.hS.rim||62) >= 75) score += gauss(0.065,0.015);
    if ((g.aS.rim||62) >= 75) score -= gauss(0.065,0.015);
    if ((g.hS.bench||34) > 50 || (g.aS.bench||34) > 50) score += gauss(0,0.055);
    if ((g.hS.sc||52) > 60) score += gauss(0.018,0.008);
    if ((g.aS.sc||52) > 60) score -= gauss(0.018,0.008);
    ps[i] = clamp(score, 0.02, 0.98);
  }
  const sorted = Float32Array.from(ps).sort();
  const mean = ps.reduce((s,x)=>s+x,0)/N;
  const variance = ps.reduce((s,x)=>s+(x-mean)**2,0)/N;
  const sd = Math.sqrt(variance);
  const p5  = sorted[Math.floor(N*.05)];
  const p25 = sorted[Math.floor(N*.25)];
  const p75 = sorted[Math.floor(N*.75)];
  const p95 = sorted[Math.floor(N*.95)];
  const buckets = new Array(28).fill(0);
  for (let i=0; i<N; i++) buckets[Math.min(27,Math.floor(ps[i]*28))]++;
  const highVar    = sd > 0.13;
  const conviction = sd < 0.095 && Math.abs(mean-0.5) > 0.13;
  const elite      = sd < 0.08  && Math.abs(mean-0.5) > 0.20;
  const hX = g.hX||{}, aX = g.aX||{};
  const ruleFired = [];
  if (hX.rf || aX.rf) ruleFired.push('ROAD FATIGUE');
  if (hX.hov || aX.hov) ruleFired.push('HANGOVER');
  if (hX.cH) ruleFired.push('CONSEC HOME');
  if (hX.bb || aX.bb) ruleFired.push('BOUNCE-BACK');
  if ((g.hS.rim||62)>=75) ruleFired.push('RIM OVERRIDE');
  if ((g.hS.ato||2)>=5.0||(g.aS.ato||2)>=5.0) ruleFired.push('ELITE A/TO');
  if (hX.el || aX.el) ruleFired.push('ELITE CLOSER');
  if (hX.hot) ruleFired.push('HOT HOME');
  if (hX.hov) ruleFired.push('HANGOVER');
  return { mean, sd, p5, p25, p75, p95, buckets, highVar, conviction, elite, N, ruleFired };
}

function runTotalsMC(leg, N=8000) {
  const { awayOrtg, awayDrtg, homeOrtg, homeDrtg, pace, baseMean, baseSd, contextMods, bet, line } = leg;
  const cm = contextMods||{};
  const LAVG=114;
  const homeExp = ((homeOrtg-LAVG)*0.5+(LAVG-awayDrtg+LAVG)*0.5)/100*pace;
  const awayExp = ((awayOrtg-LAVG)*0.5+(LAVG-homeDrtg+LAVG)*0.5)/100*pace;
  const blendedMean = (homeExp+awayExp)*0.40 + baseMean*0.60;
  const results = new Float32Array(N);
  for (let i=0; i<N; i++) {
    let total = gauss(blendedMean, baseSd);
    if (cm.homeHangover)    total += gauss(-8,3.5);
    if (cm.homeB2B)         total += gauss(-5,2.5);
    if (cm.awayRoadFatigue) total += gauss(-6,2.8);
    if (cm.homeBounceback)  total += gauss(+4,2.0);
    if (cm.awayHot)         total += gauss(+4.5,2.2);
    if (cm.awayBuzelisStar) total += gauss(+3,1.5);
    if (cm.awayTankTeam)    total += gauss(-5,2.0);
    if (cm.homeBlowoutRisk) total += gauss(0,4.0);
    results[i] = Math.max(total, 150);
  }
  const sorted = Array.from(results).sort((a,b)=>a-b);
  const mean = results.reduce((a,v)=>a+v,0)/N;
  const sd   = Math.sqrt(results.reduce((a,v)=>a+(v-mean)**2,0)/N);
  let hits=0;
  for (let i=0;i<N;i++) hits += (bet==='UNDER'?results[i]<line:results[i]>line)?1:0;
  const hitProb = hits/N;
  const BINS=24,LOW=170,HIGH=285,bw=(HIGH-LOW)/BINS;
  const buckets = new Array(BINS).fill(0);
  for (let i=0;i<N;i++){const bi=Math.floor((results[i]-LOW)/bw);if(bi>=0&&bi<BINS)buckets[bi]++;}
  return { mean, sd, hitProb, buckets, p10:sorted[Math.floor(N*0.10)], p90:sorted[Math.floor(N*0.90)], N, line, bet };
}

// ── SVG Histogram helpers ───────────────────────────────────────
function buildMCHistSVG(r, W=280, H=72) {
  if (!r) return '<svg width="'+W+'" height="'+H+'"></svg>';
  const { buckets, mean, p5, p95, highVar, conviction, elite } = r;
  const P=5, mx=Math.max(...buckets,1), bw=(W-P*2)/buckets.length;
  const bx = v => P + v*(W-P*2);
  const mc = pCol(mean);
  let bars = '';
  buckets.forEach((b,i) => {
    const bh=(b/mx)*(H-P*2-8);
    const bv=(i+.5)/buckets.length;
    bars += `<rect x="${(P+i*bw+.5).toFixed(1)}" y="${(H-P-bh).toFixed(1)}" width="${Math.max(bw-1,1).toFixed(1)}" height="${bh.toFixed(1)}" fill="${pCol(bv)}" opacity="0.78"/>`;
  });
  const ciWidth=Math.max(bx(p95)-bx(p5),0);
  let sig='';
  if (elite) sig=`<text x="${P}" y="${H-2}" fill="${C.lime}" font-size="8" font-weight="700">ELITE SIGNAL</text>`;
  else if (conviction) sig=`<text x="${P}" y="${H-2}" fill="${C.teal}" font-size="8">CONVICTION</text>`;
  else if (highVar) sig=`<text x="${P}" y="${H-2}" fill="${C.amber}" font-size="8">HIGH VAR ⚠</text>`;
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;background:${C.s2};border:1px solid ${C.bdr}">
    <rect x="${bx(p5).toFixed(1)}" y="${P}" width="${ciWidth.toFixed(1)}" height="${H-P*2}" fill="${elite?'#4ade8030':highVar?'#fbbf2422':mc+'18'}"/>
    ${bars}
    <line x1="${bx(mean).toFixed(1)}" y1="${P}" x2="${bx(mean).toFixed(1)}" y2="${H-P}" stroke="${mc}" stroke-width="2.5" opacity="0.9"/>
    <line x1="${bx(p5).toFixed(1)}"  y1="${P+3}" x2="${bx(p5).toFixed(1)}"  y2="${H-P}" stroke="${C.dim}" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="${bx(p95).toFixed(1)}" y1="${P+3}" x2="${bx(p95).toFixed(1)}" y2="${H-P}" stroke="${C.dim}" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="${bx(mean).toFixed(1)}" y="${P+8}" text-anchor="middle" fill="${mc}" font-size="10" font-weight="700">${(mean*100).toFixed(1)}%</text>
    <text x="${W-P}" y="${H-2}" text-anchor="end" fill="${C.dim}" font-size="8">90%CI: ${(p5*100).toFixed(0)}–${(p95*100).toFixed(0)}</text>
    ${sig}
  </svg>`;
}

function buildTotalsHistSVG(r, W=220, H=60) {
  if (!r) return '';
  const { buckets, mean, p10, p90, hitProb, line, bet } = r;
  const P=4, BINS=buckets.length, LOW=170, HIGH=285;
  const bw=(W-P*2)/BINS;
  const xOf = v => P+(v-LOW)/(HIGH-LOW)*(W-P*2);
  const lineX = xOf(line);
  const hitCol = hitProb>=0.60?C.lime:hitProb>=0.45?C.teal:hitProb>=0.35?C.amber:C.red;
  const mx = Math.max(...buckets,1);
  let bars='', cover='';
  buckets.forEach((b,i)=>{
    const bh=(b/mx)*(H-P*2-6);
    const midV=LOW+(i+.5)*(HIGH-LOW)/BINS;
    const hit=bet==='UNDER'?midV<line:midV>line;
    bars+=`<rect x="${(P+i*bw+.5).toFixed(1)}" y="${(H-P-bh).toFixed(1)}" width="${Math.max(bw-1,1).toFixed(1)}" height="${bh.toFixed(1)}" fill="${hit?hitCol:C.dim}" opacity="${hit?.8:.3}"/>`;
  });
  if (bet==='UNDER') cover=`<rect x="${P}" y="${P}" width="${Math.max(lineX-P,0).toFixed(1)}" height="${H-P*2}" fill="${hitCol}18"/>`;
  else cover=`<rect x="${lineX.toFixed(1)}" y="${P}" width="${Math.max(W-P-lineX,0).toFixed(1)}" height="${H-P*2}" fill="${hitCol}18"/>`;
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block;background:${C.s2};border:1px solid ${C.bdr}">
    ${cover}
    <rect x="${xOf(p10).toFixed(1)}" y="${P}" width="${Math.max(xOf(p90)-xOf(p10),0).toFixed(1)}" height="${H-P*2}" fill="${hitCol}10"/>
    ${bars}
    <line x1="${lineX.toFixed(1)}" y1="${P}" x2="${lineX.toFixed(1)}" y2="${H-P}" stroke="${C.amber}" stroke-width="2" opacity="0.9"/>
    <text x="${(lineX+2).toFixed(1)}" y="${P+9}" fill="${C.amber}" font-size="8" font-weight="700">${line}</text>
    <line x1="${xOf(mean).toFixed(1)}" y1="${P+2}" x2="${xOf(mean).toFixed(1)}" y2="${H-P}" stroke="${hitCol}" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="${xOf(mean).toFixed(1)}" y="${H-2}" text-anchor="middle" fill="${hitCol}" font-size="8">${mean.toFixed(0)}</text>
    <text x="${W-P}" y="${P+9}" text-anchor="end" fill="${hitCol}" font-size="9" font-weight="700">${(hitProb*100).toFixed(1)}%</text>
    <text x="${P}" y="${P+9}" fill="${bet==='UNDER'?C.cyan:C.gold}" font-size="8" font-weight="700">${bet}</text>
  </svg>`;
}

// ── upcToOdds: build parlay outlook odds from UPC game ─────────
function upcToOdds(g) {
  const mH=g.mH/100, mA=g.mA/100;
  const mlHome=mH>=0.5?-Math.round(100*mH/(1-mH)):+Math.round(100*(1-mH)/mH);
  const mlAway=mA>=0.5?-Math.round(100*mA/(1-mA)):+Math.round(100*(1-mA)/mA);
  const netH=(g.hS.ortg-g.hS.drtg)-(g.aS.ortg-g.aS.drtg);
  const spreadLine=Math.round(netH*0.30*2)/2;
  const spreadFav=spreadLine>=0?g.home:g.away;
  const ou=Math.round(g.hS.ortg*0.97+g.aS.ortg*0.97);
  const ouTrend=g.hS.drtg<=106&&g.aS.drtg<=106?'UNDER lean — two elite defenses':g.hS.drtg>=113||g.aS.drtg>=113?'OVER lean — leaky defense':'Neutral';
  const atsTrend={
    home:g.hX?.cH?`${g.home} consecutive home crowd`:g.hX?.hot?`${g.home} on hot streak`:g.hX?.hov?`${g.home} blowout hangover ⚠`:g.hX?.b2b?`${g.home} b2b home`:g.hX?.bb?`${g.home} bounce-back`:`${g.home} home structural`,
    away:g.aX?.rf?`${g.away} road fatigue (-8%)`:g.aX?.b2b?`${g.away} b2b road`:g.aX?.hot?`${g.away} hot road`:`${g.away} road structural`,
  };
  const rf=[];
  if(g.hX?.hot||g.aX?.hot) rf.push('HOT STREAK');
  if(g.hX?.bb||g.aX?.bb)   rf.push('BOUNCE-BACK');
  if(g.hX?.el||g.aX?.el)   rf.push('ELITE CLOSER');
  if(g.hX?.b2b||g.aX?.b2b) rf.push('B2B');
  if(g.hX?.rf||g.aX?.rf)   rf.push('ROAD FATIGUE');
  if(g.hX?.hov||g.aX?.hov) rf.push('HANGOVER');
  if(g.hX?.cH)              rf.push('CONSEC HOME');
  return { home:g.home, away:g.away, spread:{fav:spreadFav,line:Math.abs(spreadLine)}, ou, ml:{[g.home]:mlHome,[g.away]:mlAway}, pubPct:{home:g.mH,away:g.mA}, mcHome:g.mH, mcSD:8, atsTrend, ouTrend, source:'SportRadar · ARF Engine', note:g.note||`${g.home} vs ${g.away}`, ruleFired:rf };
}

// ═══════════════════════════════════════════════════════════════
//  ESPN / SPORTRADAR API  (auto-refresh)
// ═══════════════════════════════════════════════════════════════
const ESPN_SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
let liveRefreshInterval = null;

async function fetchLiveScores() {
  try {
    const res = await fetch(ESPN_SCOREBOARD, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json();
    const events = data?.events || [];
    return events.map(ev => {
      const comp = ev.competitions?.[0];
      const status = ev.status?.type;
      const home = comp?.competitors?.find(c=>c.homeAway==='home');
      const away = comp?.competitors?.find(c=>c.homeAway==='away');
      return {
        id:         ev.id,
        name:       ev.name,
        homeAbbr:   home?.team?.abbreviation,
        awayAbbr:   away?.team?.abbreviation,
        homeScore:  parseInt(home?.score||'0'),
        awayScore:  parseInt(away?.score||'0'),
        status:     status?.description || 'Scheduled',
        isLive:     status?.state === 'in',
        isFinal:    status?.completed === true,
        clock:      ev.status?.displayClock || '',
        period:     ev.status?.period || 0,
        startTime:  ev.date,
      };
    });
  } catch { return null; }
}

function updateLiveBadge(liveGames) {
  const badge = document.getElementById('live-badge');
  if (!badge) return;
  if (liveGames && liveGames.length > 0) {
    badge.style.display = 'inline-flex';
    badge.querySelector('.live-count').textContent = `${liveGames.length} LIVE`;
  } else {
    badge.style.display = 'none';
  }
}

async function refreshScores() {
  const scores = await fetchLiveScores();
  if (!scores) return;
  const live = scores.filter(g=>g.isLive);
  updateLiveBadge(live);
  // Update any live game displays already rendered
  live.forEach(g => {
    const el = document.querySelector(`[data-game-id="${g.homeAbbr}_${g.awayAbbr}"]`);
    if (el) {
      const homeScore = el.querySelector('.live-home-score');
      const awayScore = el.querySelector('.live-away-score');
      const clockEl   = el.querySelector('.live-clock');
      if (homeScore) homeScore.textContent = g.homeScore;
      if (awayScore) awayScore.textContent = g.awayScore;
      if (clockEl)   clockEl.textContent   = `Q${g.period} ${g.clock}`;
    }
  });
  // Refresh the API status strip
  const strip = document.getElementById('api-status');
  if (strip) {
    const now = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    strip.textContent = `SportRadar · last refresh ${now} · ${scores.length} events`;
  }
}

function startAutoRefresh() {
  refreshScores();
  if (liveRefreshInterval) clearInterval(liveRefreshInterval);
  liveRefreshInterval = setInterval(refreshScores, 60000); // every 60s
}

// ═══════════════════════════════════════════════════════════════
//  RENDER HELPERS
// ═══════════════════════════════════════════════════════════════
function tag(label, col, sm=false) {
  return `<span class="tag${sm?' tag-sm':''}" style="color:${col};border-color:${col}55;background:${col}12">${label}</span>`;
}

function renderDiscRow(d) {
  const col = discCol[d.t]||C.amber;
  const bg  = discBg[d.t]||'rgba(251,191,36,0.08)';
  return `<div class="disc-row">
    <span class="disc-type" style="color:${col};background:${bg};border:1px solid ${col}44">${d.t}</span>
    <span class="disc-msg">${d.msg}</span>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════
//  TAB: DEBRIEF
// ═══════════════════════════════════════════════════════════════
let currentDay = '14';

function getCumulative(upToKey) {
  const keys = ['8','9','10','11','12','13','14'];
  const idx = keys.indexOf(upToKey);
  let correct=0, total=0;
  for(let i=0;i<=idx;i++) {
    const d = DEBRIEF_DATA[keys[i]];
    if (d) { correct+=d.games.filter(g=>g.correct).length; total+=d.games.length; }
  }
  return { correct, total };
}

function renderDebriefGames(day) {
  const data = DEBRIEF_DATA[day];
  if (!data) return '<p style="color:var(--dim);padding:20px">No data for this day.</p>';
  const cum = getCumulative(day);
  const pctCum = Math.round(cum.correct/cum.total*100);
  const correct = data.games.filter(g=>g.correct).length;

  const dayColors = {'8':C.red,'9':C.amber,'10':C.cyan,'11':C.lime,'12':C.cyan,'13':C.cyan,'14':C.lime};
  const tagC = dayColors[day]||C.cyan;

  let html = `
    <div class="day-header">
      <div class="flex-1">
        <span class="dh-title">MAR ${day} · ${correct}/${data.games.length} CORRECT</span>
        <span class="dh-note">${data.note}</span>
      </div>
      ${tag(data.tag, tagC)}
      <div class="dh-cum">
        <div class="dh-cum-lbl">CUMULATIVE</div>
        <div class="dh-cum-val font-mono">${cum.correct}/${cum.total} <span style="font-size:9px;color:var(--dim)">(${pctCum}%)</span></div>
      </div>
    </div>
    <div id="game-rows">`;

  data.games.forEach((g, idx) => {
    const winner = g.score[g.home] > g.score[g.away] ? g.home : g.away;
    const margin = Math.abs(g.score[g.home]-g.score[g.away]);
    const upset  = winner !== g.favored;
    const discId = `disc-${g.id}`;
    html += `
    <div class="game-row${upset?' upset':''}" style="animation-delay:${idx*0.04}s">
      <div class="game-row-header" onclick="toggleDisc('${discId}')">
        <div class="gr-time">${g.label}</div>
        <div class="gr-score">
          ${g.home} <span class="score-val">${g.score[g.home]}</span>
          <span class="score-sep">–</span>
          ${g.away} <span class="score-val">${g.score[g.away]}</span>
        </div>
        ${g.pred?`<div class="gr-pred">Pred: <span style="color:${pCol(g.pred[g.favored]/100)};font-weight:700">${g.pred[g.favored]}%</span> ${g.favored}</div>`:''}
        ${tag(g.correct?'✓ CORRECT':'✗ MISS', g.correct?C.lime:C.red)}
        ${upset?tag('UPSET',C.red):''}
        ${margin>=30?tag(`+${margin} BLOWOUT`,C.gold):''}
        <span style="color:var(--dim);font-size:11px;margin-left:4px">${g.disc?.length?'▼':'—'}</span>
      </div>
      ${g.disc?.length?`<div class="game-disc hidden" id="${discId}">${g.disc.map(renderDiscRow).join('')}</div>`:''}
    </div>`;
  });
  html += '</div>';

  // Live panel (always shown)
  html += `
    <div class="live-panel">
      <div class="live-panel-header">
        <div class="live-dot"></div>
        <span class="lph-title">LIVE · MAR 14 EVENING</span>
        <span class="lph-sub">SportRadar feed · Last refresh: <span id="api-status">—</span></span>
      </div>
      ${LIVE_GAMES.map(lg => {
        const homeLeading = lg.liveScore[lg.home] >= lg.liveScore[lg.away];
        return `<div class="live-game-row" data-game-id="${lg.home}_${lg.away}">
          <div class="live-game-info">
            <div class="fs-8 text-dim" style="width:170px;flex-shrink:0">${lg.label}</div>
            <div class="live-score-display flex-1">
              ${lg.home} <span class="${homeLeading?'lsd-leading':'lsd-trailing'} live-home-score">${lg.liveScore[lg.home]}</span>
              <span class="lsd-sep">–</span>
              ${lg.away} <span class="${!homeLeading?'lsd-leading':'lsd-trailing'} live-away-score">${lg.liveScore[lg.away]}</span>
              <span class="lsd-clock live-clock">Q${lg.quarter} ${lg.clock}</span>
            </div>
            <div class="flex gap-6 flex-wrap">
              ${tag(`ARF ${lg.home} ${lg.arfPred[lg.home]}%`, C.cyan)}
              ${tag(`MKT ${lg.marketPred[lg.home]}%`, C.dim)}
              ${tag(`ARF: ${lg.arfResult}`, lg.arfResult==='MISS'?C.red:lg.arfResult==='TBD'?C.amber:C.lime)}
            </div>
          </div>
          <div class="game-disc">${lg.disc.map(renderDiscRow).join('')}</div>
        </div>`;
      }).join('')}
      <div class="live-game-row flex-center gap-10" style="flex-wrap:wrap">
        <div class="fs-8 text-dim" style="width:170px">Mar 14 · 8:30pm MDT · SCHEDULED</div>
        <div class="fs-13 fw-700 font-mono text-bright flex-1">LAC vs SAC</div>
        ${tag('LAC 87.3%', C.lime)} ${tag('ARF 85%', C.cyan)}
        <span class="fs-8 text-dim">LAC b2b home · SAC structural floor</span>
      </div>
    </div>`;

  // Day totals grid
  const keys = ['8','9','10','11','12','13','14'];
  const tagMap = {'8':C.red,'9':C.amber,'10':C.cyan,'11':C.lime,'12':C.cyan,'13':C.cyan,'14':C.lime};
  html += '<div class="day-totals-grid">';
  keys.forEach(k => {
    const d = DEBRIEF_DATA[k];
    const c = d.games.filter(g=>g.correct).length;
    const t = d.games.length;
    const pct = Math.round(c/t*100);
    const col = pct>=80?C.lime:pct>=60?C.teal:pct>=50?C.amber:C.red;
    html += `<div class="day-total-cell${k===day?' active':''}" onclick="switchDay('${k}')">
      <div class="dtc-lbl">MAR ${k}</div>
      <div class="dtc-val" style="color:${col}">${c}/${t}</div>
      <div class="dtc-pct" style="color:${col}">${pct}%</div>
      <div class="dtc-tag" style="color:${tagMap[k]||C.cyan}">${d.tag}</div>
    </div>`;
  });
  html += '</div>';

  html += `<div class="session-banner">
    <div>
      <div class="sb-lbl">OVERALL SESSION — MAR 8 THROUGH MAR 14</div>
      <div class="sb-detail">44 correct / 52 games across 7 days · 17 active rules · 2 live games pending</div>
    </div>
    <div class="flex-center gap-12">
      <div class="text-center">
        <div class="sb-acc-lbl">ACCURACY</div>
        <div class="sb-acc">84%</div>
      </div>
    </div>
  </div>`;

  return html;
}

function switchDay(day) {
  currentDay = day;
  // Update day tab buttons
  document.querySelectorAll('.day-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.day === day);
  });
  document.getElementById('debrief-content').innerHTML = renderDebriefGames(day);
  // Animate bars after render
  setTimeout(animateBars, 50);
}

function toggleDisc(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('hidden');
}

function renderDebriefTab() {
  const keys = ['8','9','10','11','12','13','14'];
  const tagMap = {'8':'4 UPSETS','9':'3 UPSETS','10':'1 UPSET','11':'PERFECT 🔥','12':'1 MISS','13':'1 MISS','14':'PERFECT ✓'};
  const tagC   = {'8':C.red,'9':C.amber,'10':C.cyan,'11':C.lime,'12':C.cyan,'13':C.cyan,'14':C.lime};

  let html = '<div class="day-tabs">';
  keys.forEach(k => {
    const d = DEBRIEF_DATA[k];
    const c = d.games.filter(g=>g.correct).length;
    html += `<button class="day-tab${k===currentDay?' active':''}" data-day="${k}" onclick="switchDay('${k}')">
      <div class="dt-label">MAR ${k}</div>
      <div class="dt-record" style="color:${k===currentDay?C.cyan:tagC[k]}">${c}/${d.games.length}</div>
      <div class="dt-tag">${tagMap[k]}</div>
    </button>`;
  });
  html += '</div>';
  html += `<div id="debrief-content">${renderDebriefGames(currentDay)}</div>`;
  return html;
}

// ═══════════════════════════════════════════════════════════════
//  TAB: MONTE CARLO
// ═══════════════════════════════════════════════════════════════
let mcResults = {};
let mcSimDone = false;

async function runMCAll() {
  const progressBar = document.getElementById('sim-progress');
  const statusEl    = document.getElementById('sim-status');
  const total       = UPC_TODAY.length;
  for (let i=0; i<UPC_TODAY.length; i++) {
    const g = UPC_TODAY[i];
    await new Promise(r=>setTimeout(r,0)); // yield to browser
    mcResults[g.id] = runMC(g, 7000);
    const pct = Math.round((i+1)/total*100);
    if (progressBar) progressBar.style.width = pct+'%';
    if (statusEl) statusEl.textContent = `Simulating ${g.home} vs ${g.away}… (${i+1}/${total})`;
    // Update card if already rendered
    updateMCCard(g.id);
  }
  mcSimDone = true;
  if (statusEl) statusEl.textContent = `Complete — ${total} games · 7,000 trials each`;
  if (progressBar) progressBar.style.background = C.lime;
  renderMCResults();
}

function updateMCCard(gameId) {
  const r = mcResults[gameId];
  if (!r) return;
  const card = document.getElementById(`mc-card-${gameId}`);
  if (!card) return;
  const g = UPC_TODAY.find(x=>x.id===gameId);
  if (!g) return;
  const homePct = (r.mean*100).toFixed(1);
  const awayPct = ((1-r.mean)*100).toFixed(1);
  card.querySelector('.mc-prob-home .mc-prob-val').style.color = pCol(r.mean);
  card.querySelector('.mc-prob-home .mc-prob-val').textContent = homePct+'%';
  card.querySelector('.mc-prob-away .mc-prob-val').style.color = pCol(1-r.mean);
  card.querySelector('.mc-prob-away .mc-prob-val').textContent = awayPct+'%';
  card.querySelector('.mc-hist-wrapper').innerHTML = buildMCHistSVG(r);
  // Signal
  const sigEl = card.querySelector('.mc-signal');
  if (sigEl) {
    sigEl.className = 'mc-signal' + (r.elite?' elite':r.conviction?' conv':r.highVar?' highvar':'');
    sigEl.textContent = r.elite?'⬡ ELITE SIGNAL':r.conviction?'◆ CONVICTION PICK':r.highVar?'⚠ HIGH VARIANCE':'';
    sigEl.style.display = (r.elite||r.conviction||r.highVar)?'block':'none';
  }
  // Flags
  const flagsEl = card.querySelector('.mc-flags');
  if (flagsEl) flagsEl.innerHTML = r.ruleFired.map(f=>tag(f,C.cyan,true)).join('');
  // Meta
  const metaEl = card.querySelector('.mc-meta-row');
  if (metaEl) {
    const delta = (r.mean - g.mH/100)*100;
    metaEl.innerHTML = `<span>σ <span class="meta-val">${(r.sd*100).toFixed(1)}%</span></span>
      <span>MKT <span class="meta-val">${g.mH}%</span></span>
      <span>ΔEDGE <span class="meta-val" style="color:${Math.abs(delta)>5?C.gold:C.dim}">${delta>=0?'+':''}${delta.toFixed(1)}pp</span></span>
      <span>N=7,000</span>`;
  }
}

function renderMCResults() {
  // Rebuild parlay section if on parlay tab
  if (document.getElementById('panel-parlay')?.classList.contains('active')) {
    renderParlayScout();
  }
}

function renderMCTab() {
  let cards = '';
  UPC_TODAY.forEach(g => {
    const r = mcResults[g.id];
    const homePct = r ? (r.mean*100).toFixed(1) : '—';
    const awayPct = r ? ((1-r.mean)*100).toFixed(1) : '—';
    cards += `
    <div class="mc-card" id="mc-card-${g.id}">
      <div class="mc-card-header">
        <div class="mc-matchup">${g.home}<span class="mc-vs">vs</span>${g.away}</div>
        <div class="mc-time">${g.g}</div>
      </div>
      <div class="mc-card-body">
        <div class="mc-prob-row">
          <div class="mc-prob-home text-center">
            <div class="mc-prob-val font-mono" style="color:${r?pCol(r.mean):C.dim}">${homePct}${r?'%':''}</div>
            <div class="mc-prob-lbl">${g.home} WIN</div>
          </div>
          <div class="mc-prob-sep">VS</div>
          <div class="mc-prob-away text-center">
            <div class="mc-prob-val font-mono" style="color:${r?pCol(1-(r.mean||0.5)):C.dim}">${awayPct}${r?'%':''}</div>
            <div class="mc-prob-lbl">${g.away} WIN</div>
          </div>
        </div>
        <div class="mc-hist-wrapper">${r?buildMCHistSVG(r):'<div class="skeleton" style="height:72px"></div>'}</div>
        <div class="mc-flags">${r?r.ruleFired.map(f=>tag(f,C.cyan,true)).join(''):''}</div>
        <div class="mc-meta-row">
          ${r?`<span>σ <span class="meta-val">${(r.sd*100).toFixed(1)}%</span></span>
          <span>MKT <span class="meta-val">${g.mH}%</span></span>
          <span>ΔEDGE <span class="meta-val" style="color:${Math.abs((r.mean-g.mH/100)*100)>5?C.gold:C.dim}">${(r.mean-g.mH/100)*100>=0?'+':''}${((r.mean-g.mH/100)*100).toFixed(1)}pp</span></span>
          <span>N=7,000</span>`:'<span style="color:var(--dim)">Simulating…</span>'}
        </div>
        <div class="mc-signal${r?.elite?' elite':r?.conviction?' conv':r?.highVar?' highvar':''}"
             style="display:${r&&(r.elite||r.conviction||r.highVar)?'block':'none'}">
          ${r?.elite?'⬡ ELITE SIGNAL':r?.conviction?'◆ CONVICTION PICK':r?.highVar?'⚠ HIGH VARIANCE':''}
        </div>
        <div style="margin-top:8px;font-size:9px;color:var(--dim);line-height:1.6">${g.note||''}</div>
      </div>
    </div>`;
  });

  return `<div class="mc-layout">
    <div>
      <div class="section-label">MC SIMULATION · ${UPC_TODAY.length} GAMES · 7,000 TRIALS EACH · MAR 15 2026</div>
      <div class="mc-game-grid">${cards}</div>
    </div>
    <div class="mc-sidebar">
      <div class="mc-sidebar-card">
        <div class="mc-sidebar-title">SIMULATION STATUS</div>
        <div class="sim-status">
          <span class="fs-9 text-dim">Progress</span>
          <span class="fs-9 font-mono" id="sim-status" style="color:var(--cyan)">${mcSimDone?'Complete':'Running…'}</span>
        </div>
        <div class="sim-bar-track"><div class="sim-bar-fill" id="sim-progress" style="width:${mcSimDone?100:0}%"></div></div>
      </div>
      <div class="mc-sidebar-card">
        <div class="mc-sidebar-title">LEGEND</div>
        ${[['ELITE SIGNAL',C.lime,'sd < 8%, |mean−50%| > 20%'],['CONVICTION',C.teal,'sd < 9.5%, |mean−50%| > 13%'],['HIGH VAR ⚠',C.amber,'sd > 13% — avoid in parlays'],['90% CI band','—','Shaded histogram region']].map(([l,c,d])=>`
          <div class="flex gap-8 mb-6">
            ${c!=='—'?`<span class="tag tag-sm" style="color:${c};border-color:${c}55;background:${c}12">${l}</span>`:`<span class="fs-8 text-dim">${l}</span>`}
            <span class="fs-8 text-dim flex-1">${d}</span>
          </div>`).join('')}
      </div>
      <div class="mc-sidebar-card">
        <div class="mc-sidebar-title">TODAY'S QUICK VIEW</div>
        ${UPC_TODAY.map(g => {
          const r = mcResults[g.id];
          const prob = r?(r.mean*100).toFixed(0):g.mH;
          const col = pCol(r?r.mean:g.mH/100);
          return `<div class="flex-center gap-8 mb-6">
            <span class="fs-9 fw-700 font-mono text-bright" style="width:56px">${g.home}</span>
            <span class="fs-8 text-dim flex-1">vs ${g.away}</span>
            <span class="fs-11 fw-700 font-mono" style="color:${col}">${prob}%</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════
//  TAB: PARLAY SCOUT
// ═══════════════════════════════════════════════════════════════
let parlaySection = 'scout'; // 'scout' | 'outlook'
let outlookActiveGame = null;
const qState = {}; // gameId → {q1h,q1a,...}
const qDone  = {}; // gameId → 0..4

function mkQS() { return {q1h:0,q1a:0,q2h:0,q2a:0,q3h:0,q3a:0,q4h:0,q4a:0}; }

function liveViability(baseProb, qs, qd) {
  if (qd===0) return baseProb;
  const homeTotal = qs.q1h+qs.q2h+qs.q3h+qs.q4h;
  const awayTotal = qs.q1a+qs.q2a+qs.q3a+qs.q4a;
  const homeLead  = homeTotal - awayTotal;
  const factor    = qd>=4 ? 0.5 : qd>=3 ? 0.35 : qd>=2 ? 0.20 : 0.10;
  return clamp(baseProb + homeLead * factor * 0.01, 0.05, 0.97);
}

function setParlaySection(sec) {
  parlaySection = sec;
  document.querySelectorAll('.sec-btn').forEach(b => b.classList.toggle('active', b.dataset.sec===sec));
  document.getElementById('parlay-scout-panel')?.classList.toggle('hidden', sec!=='scout');
  document.getElementById('parlay-outlook-panel')?.classList.toggle('hidden', sec!=='outlook');
}

function renderParlayScout() {
  if (!mcSimDone) {
    const el = document.getElementById('parlay-scout-panel');
    if (el) el.innerHTML = '<div style="padding:30px;text-align:center;color:var(--dim);font-size:11px">Running MC simulation first…</div>';
    return;
  }
  const good = UPC_TODAY.filter(g => {
    const r=mcResults[g.id];
    return r && r.mean>0.57 && !r.highVar && (r.conviction||r.elite);
  }).sort((a,b)=>mcResults[b.id].mean-mcResults[a.id].mean);

  const solid = UPC_TODAY.filter(g => {
    const r=mcResults[g.id];
    return r && r.mean>0.60 && !r.highVar && !good.includes(g);
  }).sort((a,b)=>mcResults[b.id].mean-mcResults[a.id].mean);

  const combP = legs => legs.reduce((p,g)=>p*mcResults[g.id].mean,1);

  const parlays = [
    {lbl:'PRIME 2-LEG',tier:'PRIME',legs:good.slice(0,2),col:C.lime},
    {lbl:'PRIME 3-LEG',tier:'PRIME',legs:good.slice(0,3),col:C.lime},
    {lbl:'VALUE 3-LEG', tier:'VALUE',legs:[...good.slice(0,1),...solid.slice(0,2)],col:C.teal},
    {lbl:'SOLID 4-LEG', tier:'SOLID',legs:[...good.slice(0,2),...solid.slice(0,2)],col:C.amber},
  ].filter(p=>{
    const unique=[...new Set(p.legs.map(g=>g.id))];
    return unique.length===p.legs.length && p.legs.length===parseInt(p.lbl.match(/\d/)?.[0]||'0');
  });

  const tierCol = t => t==='PRIME'?C.lime:t==='VALUE'?C.teal:C.amber;

  let html = '';

  if (!parlays.length) {
    html = '<div style="padding:24px;text-align:center;color:var(--dim);font-size:11px">No clean parlays — too many high-variance games today.</div>';
  } else {
    parlays.forEach((pl,pi) => {
      const cp = combP(pl.legs);
      const tc = tierCol(pl.tier);
      html += `<div class="combo-card" style="border-color:${tc}33;animation-delay:${pi*0.07}s">
        <div class="combo-card-header">
          ${tag(pl.lbl,tc)} ${tag(pl.tier,tc)}
          <div class="flex-1"></div>
          <div class="text-right">
            <div class="fs-8 text-dim">COMBINED MC</div>
            <div class="combo-prob-big" style="color:${tc}">${(cp*100).toFixed(2)}%</div>
          </div>
          <div class="text-center" style="min-width:72px;border-left:1px solid var(--bdr);padding-left:12px">
            <div class="fs-8 text-dim">IMPLIED</div>
            <div class="fs-13 fw-700 font-mono" style="color:${C.blue}">${mlStr(mlFromProb(cp))}</div>
          </div>
        </div>
        ${pl.legs.map(g => {
          const r=mcResults[g.id];
          const mc=pCol(r.mean);
          const delta=(r.mean-g.mH/100)*100;
          return `<div class="combo-leg">
            <div>
              <div class="cl-name">${g.home} ML</div>
              <div class="cl-sub">vs ${g.away} · ${g.g}</div>
              <div class="flex gap-4 mt-4">${r.ruleFired.map(f=>tag(f,C.cyan,true)).join('')}</div>
            </div>
            <div>${buildMCHistSVG(r,200,52)}</div>
            <div class="cl-mc">
              <div class="fs-8 text-dim">MC</div>
              <div class="fs-13 fw-700 font-mono" style="color:${mc}">${(r.mean*100).toFixed(1)}%</div>
              <div class="fs-8 text-dim">σ ${(r.sd*100).toFixed(1)}%</div>
            </div>
            <div class="cl-mkt">
              <div class="fs-8 text-dim">MKT</div>
              <div>${g.mH}%</div>
            </div>
            <div class="cl-edge">
              <div class="fs-8 text-dim">EDGE</div>
              <div style="color:${Math.abs(delta)>5?C.gold:C.dim}">${delta>=0?'+':''}${delta.toFixed(1)}pp</div>
            </div>
          </div>`;
        }).join('')}
      </div>`;
    });
  }

  // Avoid section
  const avoidGames = UPC_TODAY.filter(g=>{
    const r=mcResults[g.id];
    return r && (r.highVar || g.hX?.hov || g.aX?.hov);
  });
  if (avoidGames.length) {
    html += `<div class="avoid-section">
      <div class="avoid-section-title">AVOID — HIGH VARIANCE / HANGOVER / FATIGUE</div>
      <div class="avoid-chips">${avoidGames.map(g=>{
        const r=mcResults[g.id];
        const reasons=[r?.highVar&&'HI-VAR',g.hX?.hov&&'HOME HANGOVER',g.aX?.hov&&'AWAY HANGOVER'].filter(Boolean);
        return `<div class="avoid-chip">
          <div class="ac-name">${g.home} vs ${g.away}</div>
          <div class="ac-reason" style="color:${r?.highVar?C.amber:C.red}">${reasons.join(' · ')}</div>
        </div>`;
      }).join('')}</div>
    </div>`;
  }

  const el = document.getElementById('parlay-scout-panel');
  if (el) el.innerHTML = html;
}

function renderOutlookGames() {
  const outlookGames = UPC_TODAY.map(g => {
    const mc   = mcResults[g.id];
    const base = upcToOdds(g);
    const mcProb = mc ? Math.round(mc.mean*100) : g.mH;
    const mcSd   = mc ? Math.round(mc.sd*100)   : 8;
    return { key:g.id, g, odds:{...base,mcHome:mcProb,mcSD:mcSd,ruleFired:mc?.ruleFired?.length?mc.ruleFired:base.ruleFired}, mcBase:mcProb, mcSD:mcSd };
  });

  // Strip
  const colCount = Math.min(outlookGames.length, 4);
  let strip = `<div class="outlook-strip" style="grid-template-columns:repeat(${colCount},1fr)">`;
  outlookGames.forEach(og => {
    const v=og.mcBase; const col=pCol(v/100);
    strip += `<div class="outlook-chip${og.key===outlookActiveGame?' active':''}" onclick="setOutlookActive('${og.key}')">
      <div class="oc-teams">${og.odds.home}</div>
      <div class="oc-away">vs ${og.odds.away}</div>
      <div class="oc-prob" style="color:${col}">${v}%</div>
      <div class="oc-line">${og.odds.spread.fav} ${mlStr(-Math.abs(og.odds.spread.line))} · O/U ${og.odds.ou}</div>
    </div>`;
  });
  strip += '</div>';

  // Full cards
  let cards = '';
  outlookGames.forEach(og => {
    const od = og.odds;
    const viability = og.mcBase;
    const vCol = viability>=70?C.lime:viability>=55?C.teal:viability>=45?C.amber:C.red;
    const qs = qState[og.key] || mkQS();
    const qd = qDone[og.key] || 0;
    const liveP = liveViability(og.mcBase/100, qs, qd);
    const liveV = Math.round(liveP*100);
    const livCol = liveV>=70?C.lime:liveV>=55?C.teal:liveV>=45?C.amber:C.red;

    const projTotal = qd>0 ? Math.round((qs.q1h+qs.q2h+qs.q3h+qs.q4h+qs.q1a+qs.q2a+qs.q3a+qs.q4a)*(4/qd)) : od.ou;
    const ouLean = projTotal > od.ou+3 ? 'OVER' : projTotal < od.ou-3 ? 'UNDER' : 'PUSH';
    const ouCol  = ouLean==='OVER'?C.lime:ouLean==='UNDER'?C.red:C.amber;

    cards += `<div class="outlook-card" id="outlook-card-${og.key}">
      <div class="outlook-card-header">
        <div>
          <div class="flex-center gap-8 flex-wrap">
            <button class="outlook-team-btn" onclick="toggleKPI('${og.key}','home')">${od.home} <span class="fs-8 text-dim">▼KPI</span></button>
            <span class="fs-9 text-dim">vs</span>
            <button class="outlook-team-btn" onclick="toggleKPI('${og.key}','away')">${od.away} <span class="fs-8 text-dim">▼KPI</span></button>
          </div>
          <div class="outlook-odds-line mt-4">
            <span>${od.spread.fav} ${mlStr(-Math.abs(od.spread.line))}</span>
            <span>·</span><span>O/U ${od.ou}</span>
            <span>·</span><span class="ool-ml">${od.home} ${mlStr(od.ml[od.home])} / ${od.away} ${mlStr(od.ml[od.away])}</span>
            <span>·</span><span>${od.source}</span>
          </div>
          <div class="flex gap-4 mt-6 flex-wrap">${od.ruleFired.map(r=>tag(r,C.cyan,true)).join('')}</div>
        </div>
        <div class="viability-meter">
          <div class="vm-lbl">ARF VIABILITY</div>
          <div class="vm-val" style="color:${livCol}">${liveV}</div>
          <div class="vm-sub">/100</div>
        </div>
      </div>

      <div id="kpi-panel-${og.key}" class="hidden"></div>

      <div class="qtracker">
        <div class="qtracker-header">
          <span class="qtracker-label">QUARTER TRACKER</span>
          <div class="qtracker-dots">
            ${['PRE','Q1','Q2','Q3','FINAL'].map((l,qi)=>`<button class="qdot-btn${(qDone[og.key]||0)===qi?' active':''}" onclick="setQDone('${og.key}',${qi})">${l}</button>`).join('')}
          </div>
        </div>
        <div class="quarter-grid">
          ${[1,2,3,4].map(q=>`<div class="quarter-cell${q>(qDone[og.key]||0)?' inactive':' active-q'}">
            <div class="qc-label">Q${q}${q===4?' / OT':''}</div>
            <div class="quarter-input-row">
              <span class="qi-lbl">${og.odds.home}</span>
              <input type="number" class="quarter-input" min="0" max="99" value="${qs['q'+q+'h']||0}"
                oninput="updateQ('${og.key}',${q},'h',this.value)" placeholder="0">
            </div>
            <div class="quarter-input-row mt-4">
              <span class="qi-lbl">${og.odds.away}</span>
              <input type="number" class="quarter-input" min="0" max="99" value="${qs['q'+q+'a']||0}"
                oninput="updateQ('${og.key}',${q},'a',this.value)" placeholder="0">
            </div>
          </div>`).join('')}
        </div>
      </div>

      <div class="live-analysis">
        <div class="la-cell">
          <div class="lac-lbl">LIVE VIABILITY</div>
          <div class="lac-val" style="color:${livCol}" id="lv-${og.key}">${liveV}</div>
        </div>
        <div class="la-cell">
          <div class="lac-lbl">O/U LEAN</div>
          <div class="lac-val fs-11" style="color:${ouCol}" id="oulean-${og.key}">${ouLean}</div>
        </div>
        <div class="la-cell">
          <div class="lac-lbl">PROJ TOTAL</div>
          <div class="lac-val" style="color:${C.text}" id="projtot-${og.key}">${projTotal}</div>
        </div>
        <div class="la-cell">
          <div class="lac-lbl">BASE PROB</div>
          <div class="lac-val" style="color:${vCol}">${viability}%</div>
        </div>
      </div>

      <div style="padding:10px 16px;font-size:9px;color:var(--dim);line-height:1.7;border-top:1px solid var(--bdr)">
        <strong style="color:var(--text)">ATS:</strong> ${od.atsTrend.home} · ${od.atsTrend.away}<br>
        <strong style="color:var(--text)">O/U:</strong> ${od.ouTrend}<br>
        ${od.note}
      </div>
    </div>`;
  });

  const el = document.getElementById('parlay-outlook-panel');
  if (el) el.innerHTML = strip + cards;
}

function setOutlookActive(key) {
  outlookActiveGame = key;
  document.querySelectorAll('.outlook-chip').forEach(c=>c.classList.toggle('active',c.getAttribute('onclick').includes(key)));
  const card = document.getElementById(`outlook-card-${key}`);
  if (card) card.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function setQDone(gameId, q) {
  qDone[gameId] = q;
  // Refresh quarter cells styling
  document.querySelectorAll(`#outlook-card-${gameId} .quarter-cell`).forEach((cell,i)=>{
    cell.classList.toggle('inactive', i+1>q);
    cell.classList.toggle('active-q', i+1<=q);
  });
  document.querySelectorAll(`#outlook-card-${gameId} .qdot-btn`).forEach((btn,i)=>{
    btn.classList.toggle('active',i===q);
  });
  updateViability(gameId);
}

function updateQ(gameId, q, side, val) {
  if (!qState[gameId]) qState[gameId] = mkQS();
  qState[gameId][`q${q}${side}`] = parseInt(val)||0;
  updateViability(gameId);
}

function updateViability(gameId) {
  const g = UPC_TODAY.find(x=>x.id===gameId);
  const r = mcResults[gameId];
  if (!g || !r) return;
  const qs = qState[gameId]||mkQS();
  const qd = qDone[gameId]||0;
  const liveP = liveViability(r.mean, qs, qd);
  const liveV = Math.round(liveP*100);
  const livCol = liveV>=70?C.lime:liveV>=55?C.teal:liveV>=45?C.amber:C.red;

  const homeTotal = qs.q1h+qs.q2h+qs.q3h+qs.q4h;
  const awayTotal = qs.q1a+qs.q2a+qs.q3a+qs.q4a;
  const projTotal = qd>0 ? Math.round((homeTotal+awayTotal)*(4/qd)) : upcToOdds(g).ou;
  const ou = upcToOdds(g).ou;
  const ouLean = projTotal > ou+3 ? 'OVER' : projTotal < ou-3 ? 'UNDER' : 'PUSH';
  const ouCol  = ouLean==='OVER'?C.lime:ouLean==='UNDER'?C.red:C.amber;

  const lvEl = document.getElementById(`lv-${gameId}`);
  if (lvEl) { lvEl.textContent=liveV; lvEl.style.color=livCol; }
  const ouEl = document.getElementById(`oulean-${gameId}`);
  if (ouEl) { ouEl.textContent=ouLean; ouEl.style.color=ouCol; }
  const ptEl = document.getElementById(`projtot-${gameId}`);
  if (ptEl) ptEl.textContent=projTotal;
}

function toggleKPI(gameId, side) {
  const panel = document.getElementById(`kpi-panel-${gameId}`);
  const g = UPC_TODAY.find(x=>x.id===gameId);
  if (!g || !panel) return;
  const team = side==='home' ? g.home : g.away;
  const stats = side==='home' ? g.hS : g.aS;
  const acol = side==='home' ? C.teal : C.amber;
  if (!panel.classList.contains('hidden') && panel.dataset.team===team) {
    panel.classList.add('hidden');
    return;
  }
  panel.dataset.team = team;
  panel.classList.remove('hidden');
  const def=['rim','ato','pip','ts','ortg','bench','stl','fb','drtg','sc'];
  const labels={rim:'At-Rim FG%',ato:'A/TO Ratio',pip:'Paint Pts',ts:'True Shoot%',ortg:'Off Rating',bench:'Bench Pts',stl:'Steals',fb:'Fast Break',drtg:'Def Rating',sc:'2nd Chance%'};
  const maxes={rim:90,ato:6,pip:70,ts:75,ortg:130,bench:65,stl:14,fb:28,drtg:125,sc:80};
  const higherBetter={rim:true,ato:true,pip:true,ts:true,ortg:true,bench:true,stl:true,fb:true,drtg:false,sc:true};
  const offGroup=def.slice(0,5), defGroup=def.slice(5);
  const renderGroup = keys => keys.map(k=>{
    const v=stats[k]||0; const max=maxes[k]; const pct=Math.round(v/max*100);
    const good=higherBetter[k]?v>FEATS.find(f=>f.k===k)?.th*0.9:v<FEATS.find(f=>f.k===k)?.th*1.1;
    const col=good?C.teal:C.amber;
    return `<div class="kpi-row">
      <span class="kr-lbl">${labels[k]}</span>
      <span class="kr-val" style="color:${col}">${typeof v==='number'?v.toFixed(k==='ato'?1:0):v}</span>
      <div class="kr-bar"><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${col}"></div></div></div>
    </div>`;
  }).join('');

  const composite = Math.round((
    (stats.rim/90)*0.19+(stats.ato/6)*0.15+(stats.pip/70)*0.12+(stats.ts/75)*0.11+
    (stats.ortg/130)*0.10+(stats.bench/65)*0.08+(stats.stl/14)*0.07+(stats.fb/28)*0.07+stats.sc/75*0.04
  )*100);

  panel.innerHTML = `<div class="kpi-panel">
    <div>
      <div class="kpi-group-title">OFFENSE / CREATION</div>
      ${renderGroup(offGroup)}
    </div>
    <div>
      <div class="kpi-group-title">DEFENSE / EXECUTION</div>
      ${renderGroup(defGroup)}
      <div class="kpi-composite">
        <div class="kcc-lbl">ARF COMPOSITE</div>
        <div class="kcc-val" style="color:${pCol(composite/100)}">${composite}</div>
        <div class="kcc-sub">/100</div>
      </div>
    </div>
  </div>`;
  setTimeout(animateBars, 30);
}

function renderParlayTab() {
  return `<div class="parlay-layout">
    <div class="section-toggle">
      <button class="sec-btn${parlaySection==='scout'?' active':''}" data-sec="scout" onclick="setParlaySection('scout')">◈ Parlay Builder</button>
      <button class="sec-btn${parlaySection==='outlook'?' active':''}" data-sec="outlook" onclick="setParlaySection('outlook')">◎ Parlay Outlook</button>
      <div class="flex-1"></div>
      <span class="fs-8 text-dim" style="align-self:center;padding-right:12px">${mcSimDone?`${UPC_TODAY.length} games · 7,000 trials · ARF live`:'simulating…'}</span>
    </div>
    <div id="parlay-scout-panel"${parlaySection!=='scout'?' class="hidden"':''}></div>
    <div id="parlay-outlook-panel"${parlaySection!=='outlook'?' class="hidden"':''}>
      <div class="outlook-ticker">
        <div>
          <div class="ot-title">PARLAY OUTLOOK · ARF MC · ${UPC_TODAY.length} GAMES · SPORTRADAR · SESSION MAR 8–14</div>
          <div class="ot-sub">Enter quarter scores as games progress — viability updates live after each quarter.</div>
        </div>
        <div class="outlook-meta"><div class="om-lbl">GAMES TRACKED</div><div class="om-val">${UPC_TODAY.length}</div></div>
        <div class="outlook-meta"><div class="om-lbl">LINES</div><div class="fs-8 fw-700" style="color:var(--teal)">AUTO · LIVE<br>ARF ENGINE</div></div>
      </div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════
//  TAB: PARLAY LAB
// ═══════════════════════════════════════════════════════════════
let currentTicket = 't1';
let labResults = {};   // ticketId-legId → MC result
let labDone    = {};   // ticketId → bool
let expandedLeg= null; // leg id
let scenSort   = 'ev'; // 'ev' | 'prob' | 'size'

async function runLabSim(ticketId) {
  const ticket = ALL_PARLAYS.find(t=>t.id===ticketId);
  if (!ticket) return;
  labDone[ticketId] = false;
  for (const leg of ticket.legs) {
    await new Promise(r=>setTimeout(r,0));
    labResults[`${ticketId}-${leg.id}`] = runTotalsMC(leg, 8000);
    updateLabLeg(ticketId, leg.id);
  }
  labDone[ticketId] = true;
  updateLabSummary(ticketId);
}

function updateLabLeg(tid, lid) {
  const r = labResults[`${tid}-${lid}`];
  if (!r) return;
  const hitEl  = document.getElementById(`leg-hit-${lid}`);
  const histEl = document.getElementById(`leg-hist-${lid}`);
  const leanEl = document.getElementById(`leg-lean-${lid}`);
  const leg = ALL_PARLAYS.find(t=>t.id===tid)?.legs.find(l=>l.id===lid);
  if (!leg) return;
  if (hitEl) {
    hitEl.textContent = (r.hitProb*100).toFixed(1)+'%';
    hitEl.style.color = pCol(r.hitProb);
  }
  if (histEl) histEl.innerHTML = buildTotalsHistSVG(r);
  if (leanEl) {
    const agree = (leg.arfLean==='UNDER'&&r.hitProb>0.5)||(leg.arfLean==='OVER'&&r.hitProb>0.5);
    leanEl.innerHTML = tag(leg.arfLean, agree?C.lime:C.red, true) + ' ' + tag(`${(leg.arfConf*100).toFixed(0)}%`, C.cyan, true);
  }
}

function updateLabSummary(tid) {
  const ticket = ALL_PARLAYS.find(t=>t.id===tid);
  if (!ticket) return;
  const fullProb = ticket.legs.reduce((acc,l)=>{
    const r=labResults[`${tid}-${l.id}`]; return r?acc*r.hitProb:acc;
  },1);
  const el = document.getElementById('ticket-full-prob');
  if (el) { el.textContent=(fullProb*100).toFixed(3)+'%'; el.style.color=pCol(fullProb); }

  // Scenarios
  const legRes = {};
  ticket.legs.forEach(l=>{ const r=labResults[`${tid}-${l.id}`]; if(r) legRes[l.id]=r; });
  if (Object.keys(legRes).length >= ticket.legs.length) renderScenarios(ticket, legRes);
}

function renderScenarios(ticket, legRes) {
  const legs = ticket.legs;
  const n = legs.length;
  if (n < 3) return;
  const scenarios = [];
  for (let size=3; size<=n; size++) {
    const combos = getCombos(legs, size);
    combos.forEach(combo=>{
      const combinedProb = combo.reduce((acc,l)=>acc*(legRes[l.id]?.hitProb||0),1);
      const ev = combinedProb - combo.reduce((acc,l)=>acc*l.impliedProb,1);
      const impliedML = combinedProb>0.01
        ?(combinedProb>=0.5?Math.round(-100*combinedProb/(1-combinedProb)):Math.round(100*(1-combinedProb)/combinedProb))
        :99999;
      scenarios.push({legs:combo,combinedProb,impliedML,ev,size});
    });
  }
  const sorted = [...scenarios].sort((a,b)=>
    scenSort==='prob'?b.combinedProb-a.combinedProb:
    scenSort==='size'?b.size-a.size:b.ev-a.ev
  ).slice(0,8);
  const el = document.getElementById('scenario-list');
  if (!el) return;
  el.innerHTML = sorted.map((sc,i)=>{
    const col = pCol(sc.combinedProb);
    return `<div class="scenario-row">
      <div class="sr-rank" style="color:${i===0?C.gold:C.dim}">#${i+1}</div>
      <div class="sr-legs">${sc.legs.map(l=>`<span class="sr-leg-item">${tag(l.label,C.dim,true)}</span>`).join('')}</div>
      <div class="sr-prob" style="color:${col}">${(sc.combinedProb*100).toFixed(2)}%</div>
      <div class="sr-ml">${mlStr(sc.impliedML)}</div>
      <div class="sr-ev" style="color:${sc.ev>0?C.lime:C.red}">${sc.ev>=0?'+':''}${(sc.ev*100).toFixed(1)}pp EV</div>
    </div>`;
  }).join('');
}

function getCombos(arr, k) {
  const result=[];
  function helper(start,current){
    if(current.length===k){result.push([...current]);return;}
    for(let i=start;i<=arr.length-(k-current.length);i++){helper(i+1,[...current,arr[i]]);}
  }
  helper(0,[]);
  return result;
}

function selectTicket(tid) {
  currentTicket = tid;
  expandedLeg   = null;
  document.querySelectorAll('.ticket-btn').forEach(b=>b.classList.toggle('active',b.dataset.tid===tid));
  document.getElementById('ticket-main').innerHTML = renderTicketMain(tid);
  if (!labDone[tid]) runLabSim(tid);
  setTimeout(animateBars,50);
}

function toggleLeg(lid) {
  expandedLeg = expandedLeg===lid ? null : lid;
  document.querySelectorAll('.leg-row').forEach(r=>{
    const id=r.dataset.lid;
    r.classList.toggle('expanded',id===expandedLeg);
    const det=r.querySelector('.leg-detail');
    if(det) det.classList.toggle('hidden',id!==expandedLeg);
  });
}

function setScenSort(s) {
  scenSort=s;
  document.querySelectorAll('.scenario-sort-btn').forEach(b=>b.classList.toggle('active',b.dataset.sort===s));
  const ticket=ALL_PARLAYS.find(t=>t.id===currentTicket);
  if(!ticket) return;
  const legRes={};
  ticket.legs.forEach(l=>{const r=labResults[`${currentTicket}-${l.id}`];if(r)legRes[l.id]=r;});
  if(Object.keys(legRes).length>=ticket.legs.length) renderScenarios(ticket,legRes);
}

function renderTicketMain(tid) {
  const ticket = ALL_PARLAYS.find(t=>t.id===tid);
  if (!ticket) return '';
  const { legs, meta } = ticket;
  const fullProb = legs.reduce((acc,l)=>{const r=labResults[`${tid}-${l.id}`];return r?acc*r.hitProb:acc;},1);

  let html = `<div class="ticket-header-bar">
    <div>
      <div class="thb-id">TICKET ID: ${meta.id} · ${meta.time}</div>
      <div style="font-size:10px;color:var(--text);margin-top:3px">${legs.length}-leg parlay · ${meta.stake>0?'$'+meta.stake:''}</div>
    </div>
    <div class="thb-group"><div class="thbg-lbl">ODDS</div><div class="thb-odds">${meta.odds}</div></div>
    <div class="thb-group"><div class="thbg-lbl">STAKE</div><div class="thb-stake">$${meta.stake}</div></div>
    <div class="thb-group"><div class="thbg-lbl">POTENTIAL</div><div class="thb-gain">$${meta.gain.toFixed(2)}</div></div>
    <div class="thb-group"><div class="thbg-lbl">ARF FULL PROB</div><div class="fs-18 fw-700 font-mono" id="ticket-full-prob" style="color:${pCol(fullProb)}">${(fullProb*100).toFixed(3)}%</div></div>
  </div>`;

  legs.forEach(leg => {
    const r = labResults[`${tid}-${leg.id}`];
    const hitProb = r?r.hitProb:0;
    const agree = r && ((leg.arfLean==='UNDER'&&r.hitProb>0.5)||(leg.arfLean==='OVER'&&r.hitProb>0.5));
    html += `<div class="leg-row${expandedLeg===leg.id?' expanded':''}" data-lid="${leg.id}" onclick="toggleLeg('${leg.id}')">
      <div class="leg-row-header">
        <div>
          <div class="lrh-match">${leg.label}</div>
          <div class="lrh-bet">${leg.bet} ${leg.line} · ${mlStr(leg.odds)} · Implied ${(leg.impliedProb*100).toFixed(1)}%</div>
        </div>
        <div>${r?buildTotalsHistSVG(r,200,52):'<div class="skeleton" style="height:52px;width:200px"></div>'}</div>
        <div class="lrh-prob text-center">
          <div class="fs-8 text-dim">ARF HIT</div>
          <div class="fs-14 fw-700 font-mono" id="leg-hit-${leg.id}" style="color:${pCol(hitProb)}">${r?(hitProb*100).toFixed(1)+'%':'—'}</div>
        </div>
        <div class="lrh-lean text-center" id="leg-lean-${leg.id}">
          ${r?tag(leg.arfLean,agree?C.lime:C.red,true)+' '+tag((leg.arfConf*100).toFixed(0)+'%',C.cyan,true):'—'}
        </div>
        <div class="lrh-toggle text-center">${expandedLeg===leg.id?'▲':'▼'}</div>
      </div>
      <div class="leg-detail${expandedLeg===leg.id?'':' hidden'}">
        <div id="leg-hist-${leg.id}">${r?buildTotalsHistSVG(r,260,70):''}</div>
        <div class="leg-detail-note mt-8">${leg.note}</div>
        <div class="flex gap-6 mt-6 flex-wrap">
          ${Object.entries(leg.contextMods||{}).filter(([,v])=>v).map(([k])=>tag(k.replace(/([A-Z])/g,' $1').trim().toUpperCase(),C.cyan,true)).join('')}
        </div>
        ${r?`<div class="flex gap-10 mt-8" style="font-size:9px;color:var(--dim)">
          <span>Mean: <strong style="color:var(--text)">${r.mean.toFixed(1)}</strong></span>
          <span>σ: <strong style="color:var(--text)">${r.sd.toFixed(1)}</strong></span>
          <span>80%CI: <strong style="color:var(--text)">${r.p10.toFixed(0)}–${r.p90.toFixed(0)}</strong></span>
          <span>N=8,000</span>
        </div>`:''}
      </div>
    </div>`;
  });

  // Scenario section
  html += `<div class="scenario-section">
    <div class="scenario-section-header">
      <span class="scenario-header-title">⚡ SCENARIO OPTIMIZER — BEST SUB-PARLAYS</span>
      <div class="flex gap-4">
        ${['ev','prob','size'].map(s=>`<button class="scenario-sort-btn${scenSort===s?' active':''}" data-sort="${s}" onclick="setScenSort('${s}')">${s.toUpperCase()}</button>`).join('')}
      </div>
    </div>
    <div id="scenario-list"><div style="padding:16px;text-align:center;color:var(--dim);font-size:10px">Running simulation…</div></div>
  </div>`;

  return html;
}

function renderLabTab() {
  const selectorItems = ALL_PARLAYS.map(t=>
    `<button class="ticket-btn${t.id===currentTicket?' active':''}" data-tid="${t.id}" onclick="selectTicket('${t.id}')">
      <span class="tb-label">${t.label}</span>
      <span class="tb-meta">${t.meta.id} · ${t.meta.time}</span>
      <span class="tb-meta">${t.legs.length} legs · $${t.meta.stake}</span>
      <span class="tb-odds">${t.meta.odds}</span>
    </button>`
  ).join('');

  return `<div class="lab-layout">
    <div>
      <div class="ticket-selector">
        <div class="ticket-selector-title">PARLAY TICKETS</div>
        ${selectorItems}
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--bdr);font-size:8px;color:var(--dim)">
          Paste ticket data or run new session to add tickets.
        </div>
      </div>
    </div>
    <div id="ticket-main">${renderTicketMain(currentTicket)}</div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════
//  TAB: FRAMEWORK
// ═══════════════════════════════════════════════════════════════
let expandedRule = null;

function toggleRule(id) {
  expandedRule = expandedRule===id ? null : id;
  document.querySelectorAll('.rule-card').forEach(c=>{
    c.classList.toggle('expanded', c.dataset.rid===id);
  });
}

function renderFrameworkTab() {
  const sevGroups = [
    {sev:'HARD',  label:'HARD RULES (Non-Negotiable)'},
    {sev:'HIGH',  label:'HIGH PRIORITY'},
    {sev:'MED',   label:'MEDIUM'},
    {sev:'RETIRED',label:'RETIRED'},
  ];
  let html = '<div class="framework-layout"><div>';
  let side = 0;
  const allGroups = sevGroups.map(sg=>{
    const rules = RULES.filter(r=>r.sev===sg.sev);
    if (!rules.length) return '';
    const sc = sevCol[sg.sev]||C.dim;
    let g=`<div class="sev-group"><div class="sev-group-header">
      <span class="sev-group-label" style="color:${sc}">${sg.label}</span>
      <span class="sev-group-line" style="background:${sc}"></span>
      <span class="fs-8 font-mono" style="color:${sc}">${rules.length}</span>
    </div>`;
    rules.forEach(rule=>{
      const stc = stCol[rule.st]||C.dim;
      const confCol = rule.conf>=0.85?C.lime:rule.conf>=0.70?C.amber:C.dim;
      g+=`<div class="rule-card${expandedRule===rule.id?' expanded':''}" data-rid="${rule.id}" onclick="toggleRule('${rule.id}')">
        <div class="rule-card-header">
          <span class="tag tag-sm" style="color:${stc};border-color:${stc}55;background:${stc}12">${rule.st}</span>
          <span class="rule-card-name">${rule.n}</span>
          <span class="rule-card-conf" style="color:${confCol}">${(rule.conf*100).toFixed(0)}%</span>
          ${rule.delta>0?`<span class="rule-card-delta">+${(rule.delta*100).toFixed(0)}pp</span>`:''}
          <span class="rule-card-games">${rule.g}G</span>
          <span class="rule-card-chevron text-dim">▼</span>
        </div>
        <div class="rule-card-body">
          ${rule.d}
          <div class="rule-conf-bar">
            <span class="rcb-lbl">Confidence</span>
            <div class="rcb-track"><div class="rcb-fill" style="width:${rule.conf*100}%;background:${confCol}"></div></div>
            <span class="rcb-val">${(rule.conf*100).toFixed(0)}%</span>
          </div>
        </div>
      </div>`;
    });
    g+='</div>';
    return g;
  });

  // Split into two columns
  const half = Math.ceil(allGroups.filter(Boolean).length/2);
  html += allGroups.filter(Boolean).slice(0,half).join('');
  html += '</div><div>';
  html += allGroups.filter(Boolean).slice(half).join('');

  // Stats panel
  const active = RULES.filter(r=>r.sev!=='RETIRED');
  const avgConf = active.reduce((s,r)=>s+r.conf,0)/active.length;
  html += `<div class="mc-sidebar-card mt-10">
    <div class="mc-sidebar-title">SESSION STATS</div>
    ${[
      [`Active Rules`, active.length, C.cyan],
      [`NEW / ELEVATED`, RULES.filter(r=>r.st==='NEW'||r.st==='ELEVATED').length, C.red],
      [`HARD Rules`, RULES.filter(r=>r.sev==='HARD').length, C.red],
      [`Avg Confidence`, (avgConf*100).toFixed(1)+'%', C.lime],
      [`Session Accuracy`, '84%', C.lime],
    ].map(([l,v,c])=>`<div class="flex-center gap-8 mb-6">
      <span class="fs-9 text-dim flex-1">${l}</span>
      <span class="fs-11 fw-700 font-mono" style="color:${c}">${v}</span>
    </div>`).join('')}
  </div>`;

  html += '</div></div>';
  return html;
}

// ═══════════════════════════════════════════════════════════════
//  TAB ROUTER
// ═══════════════════════════════════════════════════════════════
const TABS = [
  {id:'debrief', label:'◎ Debrief'},
  {id:'mc',      label:'⬡ Monte Carlo'},
  {id:'parlay',  label:'◈ Parlay Scout'},
  {id:'lab',     label:'◇ Parlay Lab'},
  {id:'fw',      label:'⊕ Framework'},
];
let currentTab = 'debrief';
const rendered = new Set();

function switchTab(id) {
  currentTab = id;
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id==='panel-'+id));

  const panel = document.getElementById('panel-'+id);
  if (!panel) return;

  if (!rendered.has(id)) {
    rendered.add(id);
    switch (id) {
      case 'debrief': panel.innerHTML = renderDebriefTab(); break;
      case 'mc':      panel.innerHTML = renderMCTab(); break;
      case 'parlay':
        panel.innerHTML = renderParlayTab();
        if (mcSimDone) { renderParlayScout(); renderOutlookGames(); }
        break;
      case 'lab':
        panel.innerHTML = renderLabTab();
        if (!labDone[currentTicket]) runLabSim(currentTicket);
        break;
      case 'fw':      panel.innerHTML = renderFrameworkTab(); break;
    }
    setTimeout(animateBars, 80);
  } else {
    // Re-render parlay scout if MC just finished
    if (id==='parlay' && mcSimDone) {
      renderParlayScout();
      renderOutlookGames();
    }
  }
}

// ── Bar animation ───────────────────────────────────────────────
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(el => {
    const w = el.style.width;
    el.style.width = '0';
    requestAnimationFrame(()=>{ el.style.width = w; });
  });
}

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Build nav
  const nav = document.getElementById('nav');
  const newRules = RULES.filter(r=>r.st==='NEW'||r.st==='ELEVATED').length;
  TABS.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (t.id===currentTab?' active':'');
    btn.dataset.tab = t.id;
    btn.innerHTML = t.label + (t.id==='fw'?`<span class="tab-badge">${newRules}</span>`:'');
    btn.addEventListener('click', ()=>switchTab(t.id));
    nav.appendChild(btn);
  });

  // Live badge in header
  const badge = document.getElementById('live-badge');
  if (badge) badge.style.display = 'none';

  // Initial tab
  switchTab(currentTab);

  // Start MC
  runMCAll().then(()=>{
    // If parlay tab is active, refresh it
    if (currentTab==='parlay') {
      renderParlayScout();
      renderOutlookGames();
    }
  });

  // Start API auto-refresh
  startAutoRefresh();
});
