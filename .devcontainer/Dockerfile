# Use an image with Python 3.10 already installed
FROM mcr.microsoft.com/devcontainers/miniconda:0-3

# Install a different version of Python than the default
RUN conda install -y python=3.10.13 \
    && pip install --no-cache-dir pipx 

# Create the conda environment
RUN conda create -n azureai python=3.10.13 

# Clean conda cache
RUN conda clean --all --yes

COPY .devcontainer/requirements.txt /tmp/conda-tmp/requirements.txt
RUN /bin/bash -c "source activate azureai && pip install --no-cache-dir -r /tmp/conda-tmp/requirements.txt" && \
    rm -rf /tmp/conda-tmp/

# Use WORKDIR to create directory
WORKDIR /usr/local/share/omp-templates/

# Copy the template to the share template folder
COPY .devcontainer/almeida.omp.json .
