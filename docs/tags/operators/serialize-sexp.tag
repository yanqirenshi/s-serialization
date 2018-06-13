<serialize-sexp>
    <section-header-with-breadcrumb title="Function: SERIALIZE-SEXP"></section-header-with-breadcrumb>

    <section-container title="Syntax">
        <section-contents>
            <pre>serialize-sexp object stream &optional serialization-state</pre>
        </section-contents>
    </section-container>

    <section-container title="Description">
        <section-contents>
            <p><a href="#page05/serialize-sexp-internal">serialize-sexp-internal</a> をコールして object をS式(文字列)に変換します。</p>
            <p>文字列に変換したものを stream に出力します。</p>
            sexp は<a href="https://www.emacswiki.org/emacs/Sexp#sexp">S式</a>のことです。
        </section-contents>
    </section-container>

    <section-container title="Arguments">
        <section-contents>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>object</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>stream</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>serialization-state</th>
                        <td>初期値: (make-serialization-state)</td>
                    </tr>
                </tbody>
            </table>
        </section-contents>
    </section-container>
</serialize-sexp>
