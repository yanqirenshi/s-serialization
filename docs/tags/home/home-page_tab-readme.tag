<home-page_tab-readme>
    <section class="section">
        <div class="container">
            <h1 class="title">Description</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>データ/オブジェクトをシリアライズ/デシリアライズするためのライブラリです。</p>
            </div>

            <section class="section">
                <div class="container">
                    <h1 class="title is-4">生い立ち</h1>
                    <h2 class="subtitle"></h2>

                    <div class="contents">
                        <p>
                            <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> から切り出したものです。
                        </p>
                        <p>
                            <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> からフォークした 拙作 の
                            <a href="https://github.com/yanqirenshi/upanishad">UPANISHAD</a> を書く上で一旦切り出しました。
                        </p>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <h1 class="title is-4">出来ること</h1>
                    <h2 class="subtitle"></h2>

                    <div class="contents">
                        <p>以下のフォーマットにシリアライズ/デシリアライズ出来ます。</p>
                        <ol style="margin-left:3.0rem;">
                            <li>XML</li>
                            <li><a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a></li>
                        </ol>
                    </div>
                </div>
            </section>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h1 class="title">Authors</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>yanqirenshi@gmail.com</p>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h1 class="title">Licence</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>LLGPL</p>
            </div>
        </div>
    </section>

    <script>
     this.sections = () => {
         let pages = STORE.state().get('site').pages;
         let page = pages.find((d) => { return d.code=='page01'; });

         return page.sections;
     }
    </script>

</home-page_tab-readme>
