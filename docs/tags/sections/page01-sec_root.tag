<page01-sec_root>
    <section-header title="S-SERIALIZATION"
                    subtitle="データ/オブジェクトをシリアライズ/デシリアライズするためのライブラリです。"></section-header>

    <section-container title="概要">
        <section-contents>
            <p>以下のフォーマットにシリアライズ/デシリアライズ出来ます。</p>
            <ol style="margin-left:3.0rem;">
                <li>XML</li>
                <li><a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a></li>
            </ol>
        </section-contents>

        <section-contents title="生い立ち">
            <div class="contents">
                <p>
                    <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> から切り出したものです。
                </p>
                <p>
                    <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> からフォークした 拙作 の
                    <a href="https://github.com/yanqirenshi/upanishad">UPANISHAD</a> を書く上で一旦切り出しました。
                </p>
            </div>
        </section-contents>
    </section-container>

    <section-container title="Usage">
        <div class="contents">
            <p>XML へのシリアライズ、XMLからのシリアライズを以下のように行います。</p>
        </div>

        <section-contents no="4" title="シリアライズ">
            <pre>(<a href="#page03/serialize-xml">serialize-xml</a> objects out (serialization-state pool))</pre>
        </section-contents>

        <section-contents no="4" title="デシリアライズ">
            <pre>(<a href="#page03/deserialize-xml">deserialize-xml</a> in (serialization-state pool))</pre>
        </section-contents>
    </section-container>

    <section-container title="Install">
    </section-container>

    <section-container title="Tests">
        <section-contents>
            <p>
                <pre>(asdf:test-system :s-serialization-test)</pre>
            </p>
        </section-contents>
    </section-container>

    <section-footer></section-footer>

    <script>
     this.sections = () => {
         let pages = STORE.state().get('site').pages;
         let page = pages.find((d) => { return d.code=='page01'; });

         return page.sections;
     }
    </script>
</page01-sec_root>
