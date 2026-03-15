// ARF v6 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Day selector for debrief
    const dayBtns = document.querySelectorAll('.day-btn');
    dayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const day = this.getAttribute('data-day');

            // Remove active class from all day buttons
            dayBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Update day summary and games
            updateDayContent(day);
        });
    });

    // Session cards click
    const sessionCards = document.querySelectorAll('.session-card');
    sessionCards.forEach(card => {
        card.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            // Find and click the corresponding day button
            const dayBtn = document.querySelector(`.day-btn[data-day="${day}"]`);
            if (dayBtn) {
                dayBtn.click();
            }

            // Update active session card
            sessionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize with MAR 14 data
    updateDayContent('14');
    populateLiveGames();
    populateMCGames();
});

// Data from the original JSX
const MAR14 = [
    { id:"m14a", home:"PHI", away:"BKN", label:"Mar 14 · 11am ET", score:{PHI:104,BKN:97},
        correct:true, favored:"PHI", pred:{PHI:72,BKN:28},
        disc:[
            {t:"CONFIRM",msg:"PHI won 104-97 at home. BKN hangover + structural tank confirmed. BKN 2nd road game in 3 days on 3-loss streak. PHI home structural floor held despite bad season record."},
            {t:"CONFIRM",msg:"BKN blowout loss hangover rule firing again (3rd time this week). BKN scored only 97 — well below their 107 avg. Hangover -10% compressed BKN output exactly as modeled."},
        ]},
    { id:"m14b", home:"ATL", away:"MIL", label:"Mar 14 · 1pm ET", score:{ATL:122,MIL:99},
        correct:true, favored:"ATL", pred:{ATL:68,MIL:32},
        disc:[
            {t:"CONFIRM",msg:"ATL dominated 122-99 (+23). ATL hot home streak + consecutive home momentum. MIL road on short rest — road fatigue suppressed MIL exactly as predicted. BLOWOUT ALERT: MIL faces hangover for next game."},
            {t:"NEW",msg:"MIL BOUNCE-BACK CANDIDATE: MIL lost by 23 at ATL. Apply bounce-back +5.2% for MIL home vs IND on Mar 15. Blowout loss → strong bounce-back pattern (5/6 this session)."},
        ]},
    { id:"m14c", home:"SAS", away:"CHA", label:"Mar 14 · 1:30pm ET", score:{SAS:115,CHA:102},
        correct:true, favored:"SAS", pred:{SAS:78,CHA:22},
        disc:[
            {t:"CONFIRM",msg:"SAS won 115-102 at home vs CHA. De'Aaron Fox + Wemby structural combo held as predicted. CHA road structural deficits confirmed — 0/4 this week as road underdogs."},
            {t:"CONFIRM",msg:"SAS elite closer home rule: SAS is now 4/4 as home favorites this session. Elite closer rule continues to be the most reliable home pick in ARF."},
        ]},
    { id:"m14d", home:"BOS", away:"WAS", label:"Mar 14 · 4pm ET", score:{BOS:111,WAS:100},
        correct:true, favored:"BOS", pred:{BOS:91,WAS:9},
        disc:[
            {t:"CONFIRM",msg:"BOS dominated WAS 111-100 (+11). In Q3 ARF had BOS +28 lead — model was reading structural domination correctly. WAS road fatigue + worst record in East = clean structural call all week."},
            {t:"CONFIRM",msg:"BOS elite closer home continues perfect record at home vs sub-.400 road teams. 100% hit rate this session. Add to HARD rules tier."},
        ]},
];

const LIVE_GAMES = [
    { id:"live01", home:"MIA", away:"ORL", label:"Mar 14 · LIVE Q4 0:08",
        liveScore:{MIA:117,ORL:119}, quarter:4, clock:"00:08",
        arfPred:{MIA:64,ORL:36}, marketPred:{MIA:62,ORL:38},
        status:"FINAL_IMMINENT",
        arfResult:"MISS",
        disc:[
            {t:"WARN",msg:"ARF HAD MIA 64% — ORL leading 119-117 with 8 seconds left. ORL WINS. CRITICAL MISS: MIA hot home streak + consecutive home (+5%) was overridden by ORL dRTG 102 (elite) + rim% 74%. Rule refinement needed: ELITE DEFENSE OVERRIDE."},
            {t:"NEW",msg:"ELITE DEFENSE OVERRIDE RULE: When dRTG ≤ 103 AND rim% ≥ 72%, override hot home streak — cap the hot team at 55% ceiling. ORL demonstrated this exact scenario: elite defense + elite rim = structural winner regardless of opponent's hot streak."},
        ]},
    { id:"live02", home:"LAL", away:"DEN", label:"Mar 14 · LIVE Q4 6:28",
        liveScore:{LAL:96,DEN:99}, quarter:4, clock:"06:28",
        arfPred:{LAL:52,DEN:48}, marketPred:{LAL:44,DEN:56},
        status:"IN_PROGRESS",
        arfResult:"TBD",
        disc:[
            {t:"WARN",msg:"DEN leading 99-96 in Q4 with 6:28 left. Jokic road rule validated: no hangover applied on road (correct per R14). DEN +3 late — close game, Jokic within 10 in Q4 = +15% comeback/hold probability per R11."},
            {t:"CONFIRM",msg:"Market had DEN 56% road fave, ARF had LAL 52% based on hot home + double-explosion pattern (R16). Score suggests market read was more accurate for this game. If DEN wins: R16 double-explosion needs road defense caveat."},
        ]},
];

const UPC_TODAY = [
    {id:"u01",g:"Mar 15 · 1pm ET", home:"OKC",away:"MIN",mH:77,mA:23,
        note:"OKC 51-15 at home (elite fortress). Elite closer home rule. MIN just won at GSW yesterday (road win) but now b2b road at OKC. Record gap OKC vs MIN = 10 games → road fatigue spread compression (not ML flip). ARF: OKC 74% vs 77% market — slight compression. UNDER lean (both elite defenses, OKC dRTG 104)."},
    {id:"u02",g:"Mar 15 · 1:30pm ET", home:"MIL",away:"IND",mH:73,mA:27,
        note:"MIL BOUNCE-BACK at home after -23 blowout loss to ATL. Bounce-back rule +5.2% applies. IND 15-52 structural tank. ARF: MIL 78% vs 73% market — VALUE LEAN on MIL. Bounce-back home vs tank team = 5/5 this session."},
    {id:"u03",g:"Mar 15 · 1:30pm ET", home:"CLE",away:"DAL",mH:91,mA:9,
        note:"⚠ BLOWOUT HANGOVER: CLE won +33 vs DAL yesterday. HARD RULE: -10% applied. ARF: CLE 81% vs 91% market — DAL has structural parlay value but 9% is still very low. DAL b2b road + worst spread record = avoid DAL ML. CLE still wins, just with compressed margin. UNDER lean — CLE hangover suppresses offensive output."},
    {id:"u04",g:"Mar 15 · 1:30pm ET", home:"TOR",away:"DET",mH:40,mA:60,
        note:"DET road after winning at home yesterday vs MEM. DET b2b road — fatigue applies. TOR consecutive home games (+5% crowd). ARF: TOR 46% vs 40% market — compressed but DET still slight structural edge. Record gap DET(38-28) vs TOR(30-36) = 8 games → boundary for spread compression. Closest game on the slate."},
    {id:"u05",g:"Mar 15 · 4pm ET", home:"PHI",away:"POR",mH:29,mA:71,
        note:"PHI (13-51) among worst in East despite home court. POR (22-44) structurally better even as road team. ARF aligns with market: POR 70% vs 71% market. No strong regime flags. Fade PHI home — structural tank confirmed all session."},
    {id:"u06",g:"Mar 15 · 6pm ET", home:"NYK",away:"GSW",mH:85,mA:15,
        note:"GSW b2b road (played MIN yesterday, lost). GSW road fatigue + consecutive away loss. NYK home structural advantage. ARF: NYK 87% vs 85% market — slight lean NYK. GSW bench 42 HIGH VAR flag but record gap too large for ML flip. Clean structural call."},
    {id:"u07",g:"Mar 15 · 8pm ET", home:"SAC",away:"UTA",mH:62,mA:38,
        note:"SAC home vs UTA road (played POR yesterday, lost). UTA road fatigue applies — 2nd road in 2 days. SAC consecutive home games momentum. ARF: SAC 66% vs 62% market — moderate lean SAC. No elite signals on either side."},
    {id:"u08",g:"Mar 15 · 9:30pm ET", home:"HOU",away:"LAL",mH:52,mA:48,
        note:"⚠ B2B ROAD ALERT: LAL plays tonight vs DEN (live). If LAL plays, this is b2b road for LAL tomorrow at HOU. HOU bounce-back after narrow 107-105 win. ARF: HOU 56% if LAL wins tonight (b2b road penalty). Depends on tonight's LAL/DEN result. CONTINGENT PICK — monitor tonight's game first."},
];

const DEBRIEF_DAYS = [
    { key:"8",  label:"MAR 8",  record:"4/7",  tag:"4 UPSETS",  tagC:"#f87171", note:"Hangover + hot-streak rules born" },
    { key:"9",  label:"MAR 9",  record:"5/8",  tag:"3 UPSETS",  tagC:"#fbbf24", note:"Road fatigue + consec-home discovered" },
    { key:"10", label:"MAR 10", record:"10/11",tag:"1 UPSET",   tagC:"#60a5fa", note:"Buzelis 41pts OT upset (GSW/CHI)" },
    { key:"11", label:"MAR 11", record:"6/6",  tag:"PERFECT 🔥",tagC:"#4ade80", note:"Rim override vs market (ORL/CLE)" },
    { key:"12", label:"MAR 12", record:"8/9",  tag:"1 MISS",    tagC:"#60a5fa", note:"Jokic home/away rule discovered (SAS/DEN)" },
    { key:"13", label:"MAR 13", record:"7/8",  tag:"1 MISS",    tagC:"#60a5fa", note:"Road fatigue ML-flip threshold refined (GSW/MIN)" },
    { key:"14", label:"MAR 14", record:"4/4",  tag:"PERFECT ✓", tagC:"#4ade80", note:"AM/PM sweep · Evening: ORL upset + DEN road TBD" },
];

function updateDayContent(day) {
    const dayData = DEBRIEF_DAYS.find(d => d.key === day);
    if (!dayData) return;

    // Update summary
    const summaryTitle = document.querySelector('.summary-title');
    const summaryNote = document.querySelector('.summary-note');
    const tag = document.querySelector('.day-summary .tag');

    summaryTitle.textContent = `MAR ${day} · ${dayData.record} CORRECT`;
    summaryNote.textContent = dayData.note;
    tag.textContent = dayData.tag;
    tag.style.background = dayData.tagC + '20';
    tag.style.borderColor = dayData.tagC + '40';
    tag.style.color = dayData.tagC;

    // Update cumulative (simplified)
    const cumValue = document.querySelector('.cum-value');
    cumValue.innerHTML = '44/52 <span class="cum-pct">(84%)</span>';

    // Update games list
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = '';

    if (day === '14') {
        MAR14.forEach(game => {
            const gameRow = createGameRow(game);
            gamesList.appendChild(gameRow);
        });
    } else {
        // Placeholder for other days
        const placeholder = document.createElement('div');
        placeholder.innerHTML = `<div style="text-align: center; padding: 20px; color: #b0bec8;">Games for MAR ${day} would be displayed here</div>`;
        gamesList.appendChild(placeholder);
    }
}

function createGameRow(game) {
    const wTeam = game.score[game.home] > game.score[game.away] ? game.home : game.away;
    const margin = Math.abs(game.score[game.home] - game.score[game.away]);
    const upset = wTeam !== game.favored;

    const row = document.createElement('div');
    row.className = `game-row ${upset ? 'upset' : ''}`;

    const header = document.createElement('div');
    header.className = 'game-header';

    header.innerHTML = `
        <div class="game-label">${game.label}</div>
        <div class="game-score">
            ${game.home} <span style="color: #fbbf24;">${game.score[game.home]}</span>
            <span style="color: #2b3f58; margin: 0 8px;">–</span>
            ${game.away} <span style="color: #fbbf24;">${game.score[game.away]}</span>
        </div>
        ${game.pred ? `<span class="game-pred">Pred: <span style="color: ${getProbColor(game.pred[game.favored]/100)}; font-weight: 700;">${game.pred[game.favored]}%</span> ${game.favored}</span>` : ''}
        <div class="game-tags">
            <div class="tag" style="background: ${game.correct ? '#4ade8020' : '#f8717120'}; border-color: ${game.correct ? '#4ade8040' : '#f8717140'}; color: ${game.correct ? '#4ade80' : '#f87171'};">${game.correct ? '✓ CORRECT' : '✗ MISS'}</div>
            ${upset ? '<div class="tag" style="background: #f8717120; border-color: #f8717140; color: #f87171;">UPSET</div>' : ''}
            ${margin >= 30 ? `<div class="tag" style="background: #fcd34d20; border-color: #fcd34d40; color: #fcd34d;">+${margin} BLOWOUT</div>` : ''}
        </div>
    `;

    row.appendChild(header);

    if (game.disc && game.disc.length > 0) {
        const discDiv = document.createElement('div');
        discDiv.className = 'game-disc';

        game.disc.forEach(d => {
            const discItem = document.createElement('div');
            discItem.className = 'disc-item';

            discItem.innerHTML = `
                <div class="disc-tag" style="border-color: ${getDiscColor(d.t)}40; color: ${getDiscColor(d.t)}; background: ${getDiscColor(d.t)}10;">${d.t}</div>
                <div class="disc-msg">${d.msg}</div>
            `;

            discDiv.appendChild(discItem);
        });

        row.appendChild(discDiv);
    }

    return row;
}

function populateLiveGames() {
    const liveGamesDiv = document.getElementById('live-games');
    liveGamesDiv.innerHTML = '';

    LIVE_GAMES.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'live-game';

        const header = document.createElement('div');
        header.className = 'live-game-header';

        header.innerHTML = `
            <div class="live-label">${game.label}</div>
            <div class="live-score">
                ${game.home} <span style="color: ${game.liveScore[game.home] > game.liveScore[game.away] ? '#4ade80' : '#fbbf24'};">${game.liveScore[game.home]}</span>
                <span style="color: #2b3f58; margin: 0 8px;">–</span>
                ${game.away} <span style="color: ${game.liveScore[game.away] > game.liveScore[game.home] ? '#4ade80' : '#fbbf24'};">${game.liveScore[game.away]}</span>
                <span style="font-size: 9px; color: #b0bec8; margin-left: 10px;">Q${game.quarter} ${game.clock}</span>
            </div>
            <div class="live-tags">
                <div class="tag" style="background: #60a5fa20; border-color: #60a5fa40; color: #60a5fa;">ARF ${game.home} ${game.arfPred[game.home]}%</div>
                <div class="tag" style="background: #b0bec820; border-color: #b0bec840; color: #b0bec8;">MKT ${game.home} ${game.marketPred[game.home]}%</div>
                ${game.arfResult !== 'TBD' ? `<div class="tag" style="background: ${game.arfResult === 'MISS' ? '#f8717120' : '#4ade8020'}; border-color: ${game.arfResult === 'MISS' ? '#f8717140' : '#4ade8040'}; color: ${game.arfResult === 'MISS' ? '#f87171' : '#4ade80'};">ARF: ${game.arfResult}</div>` : '<div class="tag" style="background: #fbbf2420; border-color: #fbbf2440; color: #fbbf24;">TBD</div>'}
            </div>
        `;

        gameDiv.appendChild(header);

        if (game.disc && game.disc.length > 0) {
            const discDiv = document.createElement('div');
            discDiv.className = 'live-disc';

            game.disc.forEach(d => {
                const discItem = document.createElement('div');
                discItem.className = 'disc-item';

                discItem.innerHTML = `
                    <div class="disc-tag" style="border-color: ${getDiscColor(d.t)}40; color: ${getDiscColor(d.t)}; background: ${getDiscColor(d.t)}10;">${d.t}</div>
                    <div class="disc-msg">${d.msg}</div>
                `;

                discDiv.appendChild(discItem);
            });

            gameDiv.appendChild(discDiv);
        }

        liveGamesDiv.appendChild(gameDiv);
    });
}

function populateMCGames() {
    const mcGamesDiv = document.getElementById('mc-games');
    mcGamesDiv.innerHTML = '';

    UPC_TODAY.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'mc-game';

        gameDiv.innerHTML = `
            <div class="mc-game-header">
                <div class="mc-game-title">${game.g} · ${game.home} vs ${game.away}</div>
                <div class="mc-prediction">ARF: ${game.home} ${game.mH}%</div>
            </div>
            <div style="font-size: 12px; color: #e2e8f0; margin-bottom: 10px;">
                Market: ${game.home} ${game.mH}% vs ${game.away} ${game.mA}%
            </div>
            <div style="font-size: 11px; color: #b0bec8; line-height: 1.6;">
                ${game.note}
            </div>
        `;

        mcGamesDiv.appendChild(gameDiv);
    });
}

function getProbColor(prob) {
    if (prob >= 0.78) return '#4ade80';
    if (prob >= 0.65) return '#34d399';
    if (prob >= 0.55) return '#60a5fa';
    if (prob >= 0.45) return '#fbbf24';
    return '#f87171';
}

function getDiscColor(type) {
    const colors = {
        'CONFIRM': '#4ade80',
        'NEW': '#60a5fa',
        'WARN': '#fbbf24',
        'CRITICAL': '#f87171',
        'MISS': '#f87171'
    };
    return colors[type] || '#fbbf24';
}