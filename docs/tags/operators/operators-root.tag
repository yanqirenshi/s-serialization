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

    <section-3 title="List"  data={operators()}>
        <h2 class="subtitle">オペレータの一覧です。</h2>
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
