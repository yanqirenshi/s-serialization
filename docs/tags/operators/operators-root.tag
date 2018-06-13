<operators-root>
    <section-container title="Description">
        <section-contents>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>(たぶん)オペレータは以下の三つに分類できます。</p>
                <p>(1) シリアライズ</p>
                <p>(2) デシリアライズ</p>
                <p>(3) ステート</p>
            </div>
        </section-contents>
    </section-container>

    <section-container title="オペレータ">
        <section-contents>
            <p>
                XMLのデシリアライズの internal が存在しません。<br/>
                制作途中で事切れたのでしょうか。
            </p>
            <core-operator-list></core-operator-list>
        </section-contents>
    </section-container>

    <section-container title="Dictionaries" data={operators()}>
        <section-contents data={opts.data}>
            <operator-list data={opts.data}></operator-list>
        </section-contents>
    </section-container>

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
