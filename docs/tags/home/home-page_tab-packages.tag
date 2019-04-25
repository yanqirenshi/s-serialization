<home-page_tab-packages>

    <section class="section">
        <div class="container">
            <h1 class="title">List</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <table class="table is-bordered is-striped is-narrow is-hoverable">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr each={obj in packages}>
                            <td>{obj.name}</td>
                            <td>{obj.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <script>
     this.packages = STORE.get('packages');
    </script>

</home-page_tab-packages>
