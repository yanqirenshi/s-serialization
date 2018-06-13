<page03-sec_root>
    <section-header title="カスタマイズ"
                    subtitle="カスタマイズの方法について説明します。"></section-header>

    <section-container title="概要">
        <section-contents>
            <p>データタイプを増やすことでカスタマイズが可能。</p>
            <p>シリアライズのカスタマイズは <code>*-internal</code> でカスタマイズが可能</p>
            <p>デシリアライズの場合は -aux でカスタマイズが可能。</p>
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
</page03-sec_root>
