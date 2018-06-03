<section-contents>
    <section class="section">
        <div class="container">
            <h1 class="title is-{opts.no ? opts.no : 3}">
                {opts.title}
            </h1>
            <h2 class="subtitle">{opts.subtitle}</h2>
            <div class="contents">
                <yield/>
            </div>
        </div>
    </section>
</section-contents>
