export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  /*
  step 1 - call api.
  app.post('/ai', (req, res) => {
    let img = req.body.img;
    const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    temperature: 0,
    messages: [
      {
        role: "system",
        content: "
You are an expert Bootstrap developer.

- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For images, use placeholder images from https://placehold.co and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.

In terms of libraries,

- Use this script to include Bootstrap: <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
- You can use Google Fonts
- Font Awesome for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

Return only the full code in <html></html> tags.
Do not include markdown "```" or "```html" at the start or end.
"
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Generate code for a web page that looks exactly like this." },
          {
            type: "image_url",
            image_url: img,
          },
        ],
      },
    ],
  });
  res.send(response)
  })
  step 2 - match response, i.e url to content in bm.
  let content = try {
            fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/${value}/${name}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                if (!response.ok) {
                    swal("Error", `Slow internet detected`, "error")
                } else {
                    swal("Successful!", "Created Project", "success");
                    return response.data()
                }
            })
        } catch { swal("Error", "An error occurred", "error") }
  */

  bm.add('html-code', {
    attributes: { class: "fa fa-code " },
    label: "HTML Code",
    content: '<div data-html-code>Edit my HTML content</div>' // content
  });
}
