<serialize-sexp>
    <section-3 title="Function: SERIALIZE-SEXP">

        <div class="contents">
            <pre>serialize-sexp object stream &optional serialization-state</pre>
        </div>

        <section-4 title="Description">
            <div class="contents">
                <p><a href="#page03/serialize-sexp-internal">serialize-sexp-internal</a> をコールして object をS式(文字列)に変換します。</p>
                <p>文字列に変換したものを stream に出力します。</p>
                sexp は<a href="https://en.wikipedia.org/wiki/S-expression">S式</a>のことです。
            </div>
        </section-4>

        <section-4 title="Arguments">
            <div class="contents">
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
            </div>
        </section-4>
    </section-3>

</serialize-sexp>
