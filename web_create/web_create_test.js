// ページの内容が読み込まれた後に実行される関数を定義
document.addEventListener('DOMContentLoaded', function() {
    // 各要素の取得
    var spinButton = document.getElementById('spinButton');
    var judgementImage = document.getElementById('judgementImage');
    var machineSelect = document.getElementById('machineSelect');

    // 機種選択のトグルリストのイベントリスナー設定
    machineSelect.addEventListener('change', function() {
        var selectedMachine = machineSelect.value;
        switch(selectedMachine) {
            case 'test':
                setMachineParameters(2, 100, 100, [[3000, 50], [1500, 25], [300, 25]]);
                break;
            case 'rezero':
                setMachineParameters(319.6, 55, 77, [[3000, 25], [1500, 55], [300, 6], [0, 14]]);
                break;
        }
    });

    // 機種に応じたパラメータを設定する関数
    function setMachineParameters(jackpotOdds, rushEntryRate, continuationRate, roundsAndDistributions) {
        document.getElementById('jackpotOdds').value = jackpotOdds;
        document.getElementById('rushEntryRate').value = rushEntryRate;
        document.getElementById('continuationRate').value = continuationRate;
        
        var table = document.getElementById('distributionTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // テーブルの内容をクリア
        roundsAndDistributions.forEach(function(rd) {
            var newRow = table.insertRow(-1);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);

            cell1.innerHTML = '<input type="number" name="rounds[]" value="' + rd[0] + '">';
            cell2.innerHTML = '<input type="number" name="distribution[]" value="' + rd[1] + '">';
        });
    }

    // 回転ボタンのイベントリスナー
    spinButton.addEventListener('click', function() {
        var jackpotOdds = parseFloat(document.getElementById('jackpotOdds').value);
        var rushEntryRate = parseFloat(document.getElementById('rushEntryRate').value);
        var continuationRate = parseFloat(document.getElementById('continuationRate').value);
        var counterElement = document.getElementById('counter');
        var currentCount = parseInt(counterElement.textContent.split(": ")[1]);
        var jackpotImage = document.getElementById('jackpotImage');
        var modeDisplay = document.getElementById('modeDisplay');
        var isKakuchan = modeDisplay.textContent.includes('連中');
        var roundImage = document.getElementById('roundImage');

        currentCount++;
        counterElement.textContent = '回転数: ' + currentCount;

        // 確変中の処理
        if (isKakuchan) {
            if (Math.random() < continuationRate / 100) {
                var renCount = parseInt(modeDisplay.textContent.split("連中")[0]) + 1;
                modeDisplay.textContent = renCount + '連中';
                roundImage.src = determineRoundImage();
                document.getElementById('kakuchanImagesContainer').style.display = 'flex';
            } else {
                modeDisplay.textContent = '';
                document.getElementById('kakuchanImagesContainer').style.display = 'none';
                spinButton.textContent = '回転';
                isKakuchan = false;
            }
        // 通常時の大当たり判定
        } else if (Math.random() < (1 / jackpotOdds)) {
            var hitList = document.getElementById('hitList');
            var hitCount = hitList.children.length + 1;
            var listItem = document.createElement('li');
            listItem.textContent = hitCount + '回目の当たり：' + currentCount;
            hitList.appendChild(listItem);

            var audio = document.getElementById('jackpotSound');
            if (audio) {
                audio.play();
            }

            jackpotImage.src = 'resource/peka.png';
            spinButton.style.display = 'none'; // 回転ボタンを非表示
            judgementImage.style.display = 'block'; // JUDGEMENT画像を表示

            currentCount = 0;
        }

        counterElement.textContent = '回転数: ' + currentCount;
    });

    // JUDGEMENT画像のクリックイベントリスナー
    judgementImage.addEventListener('click', function() {
        var rushEntryRate = parseFloat(document.getElementById('rushEntryRate').value);

        // Rush突入判定
        if (Math.random() < rushEntryRate / 100) {
            document.getElementById('modeDisplay').textContent = '1連中';
            var kakuchanImagesContainer = document.getElementById('kakuchanImagesContainer');
            var kakuchanImage = document.getElementById('kakuchanImage');
            var roundImage = document.getElementById('roundImage');

            // 確変画像（GOD.png）と待機画像（wait.png）を表示
            kakuchanImage.src = 'resource/GOD.png';
            roundImage.src = 'resource/wait.png';
            kakuchanImagesContainer.style.display = 'flex'; // 画像コンテナを表示状態に設定
        } else {
            document.getElementById('modeDisplay').textContent = '';
        }

        spinButton.style.display = 'block'; // 回転ボタンを再表示
        judgementImage.style.display = 'none'; // JUDGEMENT画像を非表示
    });

    // ラウンド画像を決定する関数
    function determineRoundImage() {
        var distributionTable = document.getElementById('distributionTable').getElementsByTagName('tbody')[0];
        var rows = distributionTable.getElementsByTagName('tr');
        var chosenRound = '';
        var randomNumber = Math.random() * 100;
        var accumulatedProbability = 0;

        for (var i = 0; i < rows.length; i++) {
            var round = rows[i].cells[0].getElementsByTagName('input')[0].value;
            var probability = parseFloat(rows[i].cells[1].getElementsByTagName('input')[0].value);
            accumulatedProbability += probability;

            if (randomNumber <= accumulatedProbability) {
                chosenRound = round;
                break;
            }
        }

        return 'resource/' + chosenRound + '.png';
    }

    // 振り分け表に行を追加するイベントリスナー
    document.getElementById('addRowButton').addEventListener('click', function() {
        var table = document.getElementById('distributionTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(-1);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);

        cell1.innerHTML = '<input type="number" name="rounds[]">';
        cell2.innerHTML = '<input type="number" name="distribution[]">';
    });
});
