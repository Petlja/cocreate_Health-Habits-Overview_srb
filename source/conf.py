
project = 'PLCT Template'
copyright = '2025, Fondacija Petlja'
author = 'Fondacija Petlja'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [ "myst_parser",
               "sphinx_design",
               "sphinx_copybutton",
               "plct_bulder_for_sphinx.builder.plct_builder",
               "plct_sphinx_components.extensions.notes",
               "plct_sphinx_components.extensions.multiple_choice",            
               "plct_sphinx_components.extensions.fill_in_the_blank"
               ]



myst_enable_extensions = [ "colon_fence",
                           "dollarmath",
                           "html_admonition" ]

templates_path = ['_templates']
exclude_patterns = []
language = 'sr-Latn'

import plct_sphinx_components
html_static_path = ['_static'] + plct_sphinx_components.extensions.static_dirs()

copybutton_selector = "div:not(.no-copybutton) > div.highlight > pre"

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_title = 'PLCT Template'

def get_builder_from_args():
    import sys
    # print("Arguments:", sys.argv)
    for option in ['-b', '--builder', '-M']:
        if option in sys.argv:
            builder_index = sys.argv.index(option) + 1
            if builder_index < len(sys.argv):
                return sys.argv[builder_index]
    return 'html'

is_plct_builder = get_builder_from_args() == 'plct_builder'

html_theme = 'alabaster'
#html_theme = 'basic'
#html_theme = 'furo'
#html_theme = "sphinx_rtd_theme"
html_theme_options = {
    'show_powered_by' : False,
    'caption_font_size': '24px',
    'caption_font_family': 'Source Sans Pro',
    'font_family': 'Source Sans Pro',
    'font_size': '16px',
    'pre_bg' : '#f8f8f8',
    'page_width': '840px' if is_plct_builder else '1100px' ,
    'sidebar_width': '260px',
    'show_relbar_bottom': not is_plct_builder,
    'sidebar_list': '#444'
}
html_css_files = [
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
    'css/custom.css'
]
html_context = {
    'theme_nosidebar': is_plct_builder,
    'globaltoc_maxdepth': 2,
    'theme_sidebar_collapse': False,
}

html_show_copyright = False
html_show_sourcelink = False

# def setup(app):
#     def on_builder_inited(app):        
#         active_builder = app.builder.name
#         print(f"Active builder: {active_builder}")
#         if active_builder == 'plct_builder':
#            html_theme_options['page_width'] = 840
#            html_context['theme_nosidebar'] = True
#         else:
#            html_theme_options['page_width'] = 1100
#            html_context['theme_nosidebar'] = False
        
#     print("Setting up the Sphinx extension...")     
#     # Connect to the 'builder-inited' event
#     app.connect('builder-inited', on_builder_inited)

#additional_build_targets =['scorm' , 'moodle']
content_uri = './'
