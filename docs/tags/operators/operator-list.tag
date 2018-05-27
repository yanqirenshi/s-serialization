<operator-list>
    <table class="table is-bordered is-striped is-narrow is-hoverable">
        <thead>
            <tr>
                <td></td>
                <td>Type</td>
                <td>Name</td>
                <td>Description</td>
                <td>File</td>
            </tr>
        </thead>
        <tbody>
            <tr each="{data()}">
                <td style="{exportStyle(export)}"></td>
                <td>{type}</td>
                <td><a href="#page03/{name}">{name.toUpperCase()}</a></td>
                <td>{description}</td>
                <td>{file}</td>
            </tr>
        </tbody>
    </table>

    <script>
     this.data = ()=>{
         return opts.data.sort((a,b)=>{
             return a.name > b.name ? 1 : -1;
         });
     };
     this.exportStyle = (value)=>{
         return value ? 'background:#d8e698;' : '';
     };
    </script>
</operator-list>
