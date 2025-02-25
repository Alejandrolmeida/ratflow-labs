## CaskaydiaCove Nerd Font
# Uncomment the below to install the CaskaydiaCove Nerd Font
mkdir $HOME/.local
mkdir $HOME/.local/share
mkdir $HOME/.local/share/fonts
wget https://github.com/ryanoasis/nerd-fonts/releases/latest/download/CascadiaCode.zip
unzip CascadiaCode.zip -d $HOME/.local/share/fonts
rm CascadiaCode.zip

## Install Oh-my-posh 
# https://ohmyposh.dev/docs/installation/linux
curl -s https://ohmyposh.dev/install.sh | bash -s

conda init bash
echo "alias ll='ls -alF'" >> ~/.bashrc
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.bashrc
echo 'eval "$(oh-my-posh init bash --config /usr/local/share/omp-templates/almeida.omp.json)" ' >> ~/.bashrc
echo "conda deactivate" >> ~/.bashrc
echo "conda activate azureai" >> ~/.bashrc