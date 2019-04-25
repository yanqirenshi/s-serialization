<home-page_tab-classes>

    <section class="section">
        <div class="container">
            <h1 class="title">Description</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <p><code>SERIALIZATION-STATE</code> 一つのみです。今のところ。</p>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h1 class="title">List</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <table class="table is-bordered is-striped is-narrow is-hoverable">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Package</th>
                            <th>Parent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr each={obj in classes}>
                            <td>{obj.symbol}</td>
                            <td>{obj.package}</td>
                            <td>{obj.parent}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <script>
     this.classes = [
         { parent: 't (?)', symbol: 'SERIALIZATION-STATE', package: '' },
     ];
    </script>

</home-page_tab-classes>
