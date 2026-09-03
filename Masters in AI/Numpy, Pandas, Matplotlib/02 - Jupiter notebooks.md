---
course: AI Programming with Python
lesson: Numpy, Pandas, Matlabplot
module: Jupyter notebooks
date: 2026-09-03

study_time: 1h
difficulty: 1
confidence: 5
review_due: 2026-09-08

status: complete

concepts:
  - Jupyter notebooks

skills:
  - Python


projects: []

questions:
  - 

tags:
  - python
  - ai-programming
---
## Jupyter notebooks

Jupityer notebooks are a web application that allows you to combine explanatory text, math equations, code, and visualizations all in one easily shareable document.

The central point is the notebook server. You connect to the server through your browser and the notebook is rendered as a web app. Code you write in the web app is sent through the server to the kernel. The kernel runs the code and sends it back to the server, then any output is rendered back in the browser. When you save the notebook, it is written to the server as a JSON file with a .ipynb file extension.

Install Jupyter notebook using conda and then run it:
```python
conda install jupyter notebook

jupyter notebook
```
### Jupyter notebook server

By default, the notebook server runs at http://localhost:8888. As long as the server is still running, you can always come back to it by going to http://localhost:8888 in your browser.

If you start another server, it'll try to use port 8888, but since it is occupied, the new server will run on port 8889. Then, you'd connect to it at http://localhost:8889. Every additional notebook server will increment the port number like this.

### Jupyter Notebook Server Tabs

The tabs at the top of the Jupyter Notebook server interface typically include Files, Running, and Terminals. The Files tab displays all files and folders in the current directory. The Running tab lists all currently active notebooks and terminals, allowing you to manage them.

### Integrating Conda Environments with Jupyter

To easily manage your conda environments and kernels directly within Jupyter, you can install _nb_conda_kernels_. This package allows Jupyter to discover and use kernels from your various conda environments.

After successful installation, when you run the notebook server from a conda environment, you will be able to select kernels from any of your installed conda environments when creating a new notebook. Depending on your Jupyter version and setup.

Additionally, with nb_conda_kernels installed, you will be able to access any of your conda environments when choosing a kernel.

### Using notebooks

There are three modes for every cell: Code, Markdown and Raw. To create inline code blocks, wrap the code with three backticks. To create math expressions in Markdown using LaTeX symbols, wrap the LaTex in dollar signs for inline math. Use double dollar signs to create a math block.

### Magic keywords

Magic keywords are special commands you can run in cells that let you control the notebook itself or perform system calls such as changing directories. For example, you can set up matplotlib to work interactively in the notebook with _%matplotlib_.

Magic commands are preceded with one or two percent signs (% or %%) for line magics and cell magics, respectively. Line magics apply only to the line the magic command is written on, while cell magics apply to the whole cell.

NOTE: These magic keywords are specific to the normal Python kernel. These most likely won't work on other kernels.

A full list of [magic commands is available here](https://ipython.readthedocs.io/en/stable/interactive/magics.html).

### Timing code execution

Use the _%timeit_ magic command to call a function and time it.
Use the _%%timeit_ magic command at the beginning of a cell to time the execution of the entire cell.

### Embedding visualizations in notebooks

Notebooks let you embed images along with text and code. This is most useful when using matplotlib or other plotting packages to create visualizations. You can use _%matplotlib_ to set up matplotlib for interactive use in the notebook. 

By default, figures will render in their own window. However, you can pass arguments to the command to select a specific "backend"(opens in a new tab), the software that renders the image. To render figures directly in the notebook, you should use the inline backend with the command %matplotlib inline.

Tip: On higher resolution screens such as Retina displays, the default images in notebooks can look blurry. Use _%config InlineBackend.figure_format = 'retina'_ after %matplotlib inline to render higher resolution images.

### Debugging in a notebook

Turn on the interactive debugger using the magic command _%pdb_. When you cause an error, you'll be able to inspect the variables in the current namespace. To quit the debugger, simply enter q in the prompt after an error.

#### Converting notebooks

Notebooks are saved as JSON files with an .ipynb extension, making them easy to convert to other formats.

Jupyter comes with a utility called _nbconvert_ for converting to HTML, Markdown, slideshows, etc. The general syntax to convert a given mynotebook.ipynb file to another FORMAT is:
```python
jupyter nbconvert --to FORMAT mynotebook.ipynb
```

Supported output formats for conversion include:
HTML,
LaTeX,
PDF,
WebPDF,
Reveal.js HTML slideshow,
Markdown,
Ascii,
reStructuredText,
executable script,
notebook

### Creating slideshows

Slides are created in notebooks like normal, but you'll need to designate which cells are slides and the type of slide the cell will be. In the menu bar, click View > Right Sidebar > Show Notebook Tools.

Right sidebar will appear where you can select a cell and use Common Tools.

Slides are full slides that you move through left to right. Sub-slides show up in the slideshow by pressing up or down. Fragments are hidden at first, then appear with a button press. You can skip cells in the slideshow with Skip and Notes leaves the cell as speaker notes.

To create the slideshow from a notebook file, use nbconvert:
```python
jupyter nbconvert notebook.ipynb --to slides

# Use the following to convert and then serve it via HTTP
jupyter nbconvert notebook.ipynb --to slides --post serve
```
