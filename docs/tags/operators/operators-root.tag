<operators-root>
    <section-3 title="Description">
        <h2 class="subtitle"></h2>

        <div class="contents">
            <p>(たぶん)オペレータは以下の三つに分類できます。</p>
            <p>(1) シリアライズ</p>
            <p>(2) デシリアライズ</p>
            <p>(3) ステート</p>
        </div>

    </section-3>

    <section-3 title="オペレータ"  data={operators()}>
        <div class="contents">
            <p>
                XMLのデシリアライズの internal が存在しません。<br/>
                制作途中で事切れたのでしょうか。
            </p>
            <core-operator-list></core-operator-list>
        </div>
    </section-3>

    <section-3 title="データ・タイプ"  data={operators()}>
        <div class="contents">
            <p></p>
            <serialize-type-matrix></serialize-type-matrix>
        </div>
    </section-3>

    <section-3 title="Dictionaries"  data={operators()}>
        <div class="contents">
            <operator-list data={opts.data}></operator-list>
        </div>
    </section-3>

    <script>
     this.operators = ()=>{
         let operators = STORE.state().get('operators');
         let targets = []
         for (var i in operators)
             // if (operators[i].display)
             targets.push(operators[i]);
         return targets;
     };
    </script>
</operators-root>
