import streamlit as st

def main():
    st.set_page_config(page_title="CV-Screening", page_icon=":books:")

    st.header("CV-Screening :books:")
    st.text_input("Ask a question about your documents:")

    with st.sidebar:
        st.subheader("Your documents")
        st.file_uploader("Upload your PDFs here and click on 'Process'")
        st.button("Process")

if __name__ == '__main__':
    main()