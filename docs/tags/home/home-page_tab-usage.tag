<home-page_tab-usage>

    <section class="section">
        <div class="container">
            <h1 class="title">シリアライズ</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p><pre>(<a href="#page03/serialize-xml">serialize-xml</a> objects stream (serialization-state pool))</pre></p>
                <br/>
                <p>今後は以下のようにする方向。</p>
                <p><pre>(hole:black stream objects :state (serialization-state pool))</pre></p>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h1 class="title">デシリアライズ</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <pre>(<a href="#page03/deserialize-xml">deserialize-xml</a> stream (serialization-state pool))</pre>
                <br/>
                <p>今後は以下のようにする方向。</p>
                <p><pre>(hole:white stream :state (serialization-state pool))</pre></p>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h1 class="title">Test</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p>
                    <pre>(asdf:test-system :s-serialization-test)</pre>
                </p>
            </div>
        </div>
    </section>

</home-page_tab-usage>
