---
course: AI Programming with Python
lesson: Numpy, Pandas, Matlabplot
module: Jupyter notebooks
date: 2026-09-03

study_time: 0h
difficulty: 1
confidence: 5
review_due: 2026-09-08

status: in progress

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

