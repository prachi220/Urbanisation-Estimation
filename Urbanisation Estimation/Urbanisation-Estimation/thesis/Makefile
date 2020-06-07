all:
doc=thesis
# -interaction=nonstopmode
all: $(doc).tex
	pdflatex -interaction=nonstopmode $(doc)
	bibtex $(doc)
	pdflatex -interaction=nonstopmode $(doc)
	pdflatex -interaction=nonstopmode $(doc)

clean :
	rm -f $(doc).pdf
	rm -f $(doc).log
	rm -f $(doc).aux
	rm -f $(doc).dvi
	rm -f $(doc).toc
	rm -f $(doc).lof
	rm -f $(doc).lot
	rm -f $(doc).bbl
	rm -f $(doc).blg
	rm -f $(doc).out
	rm -f $(doc).bcf
	rm -f $(doc).run.xml
