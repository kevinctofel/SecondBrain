---
course: AI Programming with Python
lesson: Numpy, Pandas, Matlabplot
module: Anaconda
date: 2026-09-03

study_time: 1h
difficulty: 1
confidence: 5
review_due: 2026-09-08

status: complete

concepts:
  - Anaconda / Miniconda
  - Conda usage
  - Managing and using environments


skills:
  - Python
  - Conda


projects: []

questions:
  - 

tags:
  - python
  - ai-programming
---
## Anaconda

[Anaconda](https://anaconda.org/) is a distribution of packages built for data science. It comes with _conda_, a package and environment manager. We use conda to create environments for isolating  projects that use different versions of Python and/or different packages. It's also used to install, uninstall, and update packages in environments

Example using conda to create a virtual environment and install packaages:
```python
conda create -n tea_facts python=3
conda activate tea_facts
conda list
conda install numpy pandas matplotlib
```

#### What is Anaconda?

Even if Python is already installed, it will be beneficial to use Anaconda/Miniconda because:

- Anaconda comes with a bunch of data science packages; you'll be all set to start working with data.
- Using conda to manage your packages and environments will reduce future issues dealing with the various libraries you'll be using.

#### Python Packages

A package is a bunch of modules, where each module consists of a set of classes and function definitions. After installing a particular package, you can import and use the functions defined in that package.

If we install Anaconda, then a basic few packages are installed by default. However, we can install any more packages, if needed.

### Anaconda Distribution
Anaconda is a fairly large download because it comes with Python's most common data science packages. Anaconda is a software distribution that includes the following:

- Anaconda Navigator: A graphical user interface that helps open up any installed applications, such as Jupyter notebook or VS code editor.
- conda: A command-line utility for package and environment management.
- Python: The latest version of Python gets installed as an individual package.
- Other: Over 160 scientific packages and their dependencies are also installed.

### Managing Packages using either pip or conda

The conda and pip both are the Python package managers. Package managers are used to install libraries and other software on your computer. pip is the default package manager for Python libraries, whereas conda focuses only on the packages that are available from the Anaconda distribution.

### Environments

A Python environment comprises a particular version of each of the following:
- Python interpreter
- Python-packages
- Utility scripts, such as pip. It is possible to have two or more environments residing on the same computer virtually. If you are using Anaconda, you are in the base(root) environment by-default.

#### Why do we need a Virtual Environment?
Environments allow you to separate and isolate the packages you are using for different projects. Often you’ll be working with code that depends on different versions of some library. For example, you could have code that uses new features in Numpy, or code that uses old features that have been removed. It’s practically impossible to have two versions of Numpy installed at once. Instead, you should make an environment for each version of Numpy then work in the appropriate environment for the project.

This issue also happens a lot when dealing with Python 2 and Python 3. You might be working with old code that doesn’t run in Python 3 and new code that doesn’t run in Python 2. Having both installed can lead to a lot of confusion and bugs. It’s much better to have separate environments.

You can also export the list of packages in an environment to a file, then include that file with your code. This allows other people to easily load all the dependencies for your code. Pip has similar functionality with _pip freeze > requirements.txt_.

### Anaconda commands and examples:

#### Installing packages

```python
conda install PACKAGE_NAME[= version (optional)]
```

#### Removing packages
```python
conda remove PACKAGE_NAME
```

#### Updating packages
```python
conda update package_name
# For a specific package

conda update --all
# Update all packages in an environment
```

#### Listing all installed packages

```python
conda list
```

#### Searching for package to install

```python
conda search *SEARCH_TERM*
```

#### Creating an environment
```python
conda create -n env_name [python=X.X] [LIST_OF_PACKAGES]
```

#### Activating an environment
```python
conda activate my_env
```

#### Deactivating an environment
```python
conda deactivate
```

#### Exporting an environment
```python
conda env export > environment.yaml
```

#### Creating an environment from an import
```python
conda env create -f environment.yaml
```

#### Listing environments (use either)
```python
conda env list
conda info --envs
```

#### Removing an environment
```python
conda env remove -n env_name
```







