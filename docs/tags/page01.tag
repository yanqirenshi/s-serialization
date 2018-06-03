<page01>
    <section-header title="S-SERIALIZATION">
        <h2 class="subtitle">
            データ/オブジェクトをシリアライズ/デシリアライズするためのライブラリです。。
        </h2>
    </section-header>

    <section class="section">
        <div class="container">
            <h1 class="title">概要</h1>
            <div class="contents">
                以下のフォーマットにシリアライズ/デシリアライズ出来ます。
                <ol style="margin-left:3.0rem;">
                    <li>XML</li>
                    <li><a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a></li>
                </ol>
            </div>
        </div>
    </section>

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


    <section-container title="カスタマイズ">
        <section-contents no="4" title="構造">
            <p>
                シリアライズ/デシリアライズのオペレータは以下の様な構成になっています。<br/>
                以下の例は XML ですが SEXP でも同じ構成です。
            </p>
            <p>
                <a>serialize-xml</a> ---call---> <a>serialize-xml-internal</a>
            </p>
            <p>
                <a>deserialize-xml</a> ---call---> <a>serialize-xml-internal</a>
            </p>
            <p>
                例えば、XML へのシリアライズの内容を変更したい場合は <a>serialize-xml-internal</a> をオーバーライドすると良いです。
            </p>
            <p>
                また <a>serialize-xml-internal</a> は Generic Function なので、クラス毎でのカスタマイズが可能です。
            </p>
            <p>
                デシリアライズに関しても同じことが言えます。
            </p>
        </section-contents>

        <section-contents no="4" title="Operator: *-internal">
            <p>
                以下の Generic Function を利用してカスタマイズできます。
            </p>
            <table class="table is-bordered is-striped is-narrow is-hoverable">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>serialize</th>
                        <th>deserialize</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>XML</th>
                        <td><a href="#page03/serialize-xml-internal">serialize-xml-internal</a></td>
                        <td><a href="#page03/deserialize-xml-internal">deserialize-xml-internal</a></td>
                    </tr>
                    <tr>
                        <th>SEXP</th>
                        <td><a href="#page03/serialize-sexp-internal">serialize-sexp-internal</a></td>
                        <td><a href="#page03/deserialize-sexp-internal">deserialize-sexp-internal</a></td>
                    </tr>
                </tbody>
            </table>
        </section-contents>
    </section-container>

    <section-3 title="生い立ち">
        <div class="contents">
            <p>
                <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> から切り出したものです。
            </p>
            <p>
                <a href="https://bitbucket.org/skypher/cl-prevalence">CL-PREVALENCE</a> からフォークした 拙作 の
                <a href="https://github.com/yanqirenshi/upanishad">UPANISHAD</a> を書く上で一旦切り出しました。
            </p>
        </div>
    </section-3>

    <section-footer></section-footer>
</page01>
