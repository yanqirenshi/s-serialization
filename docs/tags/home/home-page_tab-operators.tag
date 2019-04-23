<home-page_tab-operators>

    <section class="section">
        <div class="container">
            <h1 class="title">Description</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>(たぶん)オペレータは以下の三つに分類できます。</p>
                <p>(1) シリアライズ</p>
                <p>(2) デシリアライズ</p>
                <p>(3) ステート</p>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h1 class="title">オペレータ</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>
                    XMLのデシリアライズの internal が存在しません。<br/>
                    制作途中で事切れたのでしょうか。
                </p>
                <core-operator-list></core-operator-list>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h1 class="title">Dictionaries</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <operator-list data={operators()}></operator-list>
            </div>
        </div>
    </section>

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

</home-page_tab-operators>
